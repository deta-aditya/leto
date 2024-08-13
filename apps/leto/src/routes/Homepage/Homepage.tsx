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
    navigate(`/accom/${id}`);
  };

  return (
    <FrontPageTemplate>
      <section className="flex justify-center drop-shadow gap-1">
        <input 
          type="text" 
          placeholder="Destination" 
          className="p-4 w-[24rem] rounded-l-md" 
          onChange={handleDestinationChange} 
        />
        <input 
          type="date" 
          placeholder="Check in" 
          className="p-4" 
          value={checkIn}
          onChange={handleCheckInDateChange}
        />
        <input 
          type="date" 
          placeholder="Check out" 
          className="p-4" 
          value={checkOut}
          onChange={handleCheckOutDateChange}
        />
        <input 
          type="number" 
          placeholder="Rooms" 
          className="p-4 rounded-r-md"
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
