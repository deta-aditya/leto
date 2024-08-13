import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '@uidotdev/usehooks';
import { ArchiveBoxXMarkIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Arrays } from '@leto/core';

import FrontPageTemplate from '../../components/FrontPageTemplate';
import { AccommodationCard, AccommodationCardLoading } from './AccommodationCard';
import { getAccommodations } from './Homepage.queries';
import { 
  createAsyncListData, 
  DESTINATION_DEBOUNCE_DURATION, 
  matchAsyncListData, 
} from './Homepage.helpers';
import { 
  createCheckInEventHandler,
  createCheckOutEventHandler,
  createDestinationEventHandler,
  createRoomsEventHandler,
  getCheckIn, 
  getCheckOut, 
  getDestination, 
  getRooms, 
} from '../../helpers/front-page-parameters';

function Homepage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const destination = getDestination(searchParams);
  const checkIn = getCheckIn(searchParams);
  const checkOut = getCheckOut(searchParams);
  const rooms = getRooms(searchParams);

  const debouncedDestination = useDebounce(
    destination, 
    DESTINATION_DEBOUNCE_DURATION,
  );

  const { data, error } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['accommodations', debouncedDestination], 
    queryFn: () => getAccommodations(debouncedDestination),
    onSettled: () => setLoading(false),
  });

  const asyncListData = createAsyncListData({ loading, data, error });

  const handleDestinationChange = createDestinationEventHandler(searchParams, setSearchParams);
  const handleCheckInDateChange = createCheckInEventHandler(searchParams, setSearchParams);
  const handleCheckOutDateChange = createCheckOutEventHandler(searchParams, setSearchParams);
  const handleRoomsChange = createRoomsEventHandler(searchParams, setSearchParams);

  const handleAccommodationCardClick = (id: number) => {
    navigate(`/accom/${id}?${searchParams.toString()}`,);
  };

  return (
    <FrontPageTemplate>
      <section 
        className="grid drop-shadow-xl bg-gradient-to-b from-blue-700 to-blue-500 p-8 rounded-lg items-center gap-y-2 gap-x-4"
        style={{ gridTemplateColumns: '2fr repeat(3, 1fr)' }}
      >
        <label className="text-white">Destination</label>
        <label className="text-white">Check In</label>
        <label className="text-white">Check Out</label>
        <label className="text-white">Rooms</label>
        <input 
          type="text" 
          placeholder="Jakarta, Bandung, etc." 
          className="p-4 rounded-lg border" 
          onChange={handleDestinationChange} 
        />
        <input 
          type="date" 
          placeholder="Check in" 
          className="p-4 rounded-lg border" 
          value={checkIn}
          onChange={handleCheckInDateChange}
        />
        <input 
          type="date" 
          placeholder="Check out" 
          className="p-4 rounded-lg border" 
          value={checkOut}
          onChange={handleCheckOutDateChange}
        />
        <input 
          type="number" 
          placeholder="Rooms" 
          className="p-4 rounded-lg border" 
          value={rooms}
          onChange={handleRoomsChange}
        />
      </section>
      <section className="grid grid-cols-4 gap-8 mb-16 min-h-64">
        {matchAsyncListData(asyncListData, {
          loading: () => (
            <>
              {Arrays.range(8).map(index => (
                <AccommodationCardLoading key={index} />
              ))}
            </>
          ),
          error: reason => (
            <div className="flex flex-col justify-center items-center col-span-4 mt-8">
              <XCircleIcon className="size-14 text-red-400 mb-2" />
              <p className="text-red-400 text-lg mb-1">An error has occurred!</p>
              <p className="text-slate-400">{reason}</p>
            </div>
          ),
          successEmpty: () => (
            <div className="flex flex-col justify-center items-center col-span-4 gap-2 mt-8">
              <ArchiveBoxXMarkIcon className="size-14 text-slate-400" />
              <p className="text-slate-400 text-lg">No accommodations found!</p>
            </div>
          ),
          successHasData: accommodations => (
            <>
              {accommodations.map(accommodation => (
                <AccommodationCard 
                  key={accommodation.id} 
                  accommodation={accommodation} 
                  onClick={() => handleAccommodationCardClick(accommodation.id)}
                />
              ))}
            </>
          )
        })}
      </section>
    </FrontPageTemplate>
  )
}

export default Homepage;
