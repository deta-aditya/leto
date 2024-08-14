import { useQuery } from "react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CheckIcon, StarIcon } from "@heroicons/react/24/solid";
import { Arrays, Option } from "@leto/core";
import FrontPageTemplate from "../../components/FrontPageTemplate";
import ShimmeredImage from "../../components/ShimmeredImage";
import { 
  createCheckInEventHandler, 
  createCheckOutEventHandler, 
  createRoomsEventHandler, 
  getCheckIn, 
  getCheckOut, 
  getRooms, 
  UNIT_ID_QUERY_PARAMS_KEY, 
} from "../../helpers/front-page-parameters";
import { getAccommodationDetails } from "./AccommodationDetails.queries";
import { UnitCardLoading, UnitCard } from "./UnitCard";

function AccommodationDetails() {
  const { accomId } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const checkIn = getCheckIn(searchParams);
  const checkOut = getCheckOut(searchParams);
  const rooms = getRooms(searchParams);

  const { data, error } = useQuery({
    queryKey: ['accommodation-details', accomId],
    queryFn: () => getAccommodationDetails(accomId || ''),
    enabled: accomId !== undefined,
  });

  const maybeError = Option.fromNullable(error);
  const maybeData = Option.fromNullable(data);

  const handleCheckInDateChange = createCheckInEventHandler(searchParams, setSearchParams);
  const handleCheckOutDateChange = createCheckOutEventHandler(searchParams, setSearchParams);
  const handleRoomsChange = createRoomsEventHandler(searchParams, setSearchParams);

  const handleBook = (unitId: number) => {
    searchParams.append(UNIT_ID_QUERY_PARAMS_KEY, String(unitId));
    navigate(`/checkout?${searchParams.toString()}`);
  }

  return (
    <FrontPageTemplate>
      {Option.match(maybeError, {
        some: reason => <>Error! {reason}</>,
        none: () => (
          <div className="flex flex-col gap-16 mb-16">
            <section className="grid grid-cols-4 gap-2 h-64">
              {Option.match(maybeData, {
                none: () => Arrays.range(4).map(index => (
                  <div key={index} className="animate-pulse bg-slate-200 h-64 rounded-lg" />
                )),
                some: value => value.accommodation.pictures.map((picture, idx) => (
                  <ShimmeredImage
                    key={idx}
                    shimmerClassName="rounded-lg" 
                    className="rounded-lg h-64 drop-shadow hover:drop-shadow-2xl transition"
                    src={picture} 
                    alt="Lorem Ipsum Dolor Sit Hotel" 
                  />
                ))
              })}
            </section>
            <section className="grid grid-cols-2 gap-16">
              <section className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    {Option.match(maybeData, {
                      none: () => Arrays.range(5).map(index => (
                        <div key={index} className="bg-slate-200 size-6 mr-1 rounded-full animate-pulse" />
                      )),
                      some: data => Arrays.range(data.accommodation.star).map(index => (
                        <StarIcon key={index} className="size-6" />
                      ))
                    })}
                  </div>
                  {Option.match(maybeData, {
                    none: () => <div className="bg-slate-200 h-9 w-64 rounded-lg animate-pulse" />,
                    some: data => <h1 className="text-4xl">{data.accommodation.name}</h1>,
                  })}
                  {Option.match(maybeData, {
                    none: () => <div className="bg-slate-200 h-4 w-32 rounded-lg animate-pulse" />,
                    some: data => <p className="text-gray-500">{data.accommodation.location}</p>,
                  })}
                </div>
                {Option.match(maybeData, {
                  none: () => <div className="bg-slate-200 h-40 rounded-lg animate-pulse" />,
                  some: data => <p className="text-lg">{data.accommodation.description}</p>,
                })}
                <div className="grid grid-cols-3 gap-4">
                  {Option.match(maybeData, {
                    none: () => Arrays.range(6).map(index => (
                      <div key={index} className="flex items-center gap-2 mb-3">
                        <div className="bg-slate-200 size-4 rounded-full animate-pulse" />
                        <div className="bg-slate-200 h-6 w-32 rounded-lg animate-pulse" />
                      </div>
                    )),
                    some: data => data.accommodation.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckIcon className="size-4" /> 
                        <span className="text-lg">{facility}</span>
                      </div>
                    ))
                  })}
                </div>
              </section>
              <section className="flex flex-col gap-8">
                <section 
                  className="grid grid-cols-3 drop-shadow-xl bg-gradient-to-b from-blue-700 to-blue-500 p-6 rounded-lg items-center gap-y-2 gap-x-4"
                >
                  <label className="text-white">Check In</label>
                  <label className="text-white">Check Out</label>
                  <label className="text-white">Rooms</label>
                  <input 
                    type="date" 
                    placeholder="Check in" 
                    className="p-4 rounded-lg border" 
                    value={checkIn}
                    disabled={maybeData.kind === 'none'}
                    onChange={handleCheckInDateChange}
                  />
                  <input 
                    type="date" 
                    placeholder="Check out" 
                    className="p-4 rounded-lg border" 
                    value={checkOut}
                    disabled={maybeData.kind === 'none'}
                    onChange={handleCheckOutDateChange}
                  />
                  <input 
                    type="number" 
                    placeholder="Rooms" 
                    className="p-4 rounded-lg border" 
                    value={rooms}
                    disabled={maybeData.kind === 'none'}
                    onChange={handleRoomsChange}
                  />
                </section>
                <section className="flex flex-col gap-7">
                  {Option.match(maybeData, {
                    none: () => Arrays.range(3).map(index => (
                      <UnitCardLoading key={index} />
                    )),
                    some: data => data.units.map(unit => (
                      <UnitCard 
                        key={unit.id} 
                        unit={unit}
                        onBookClick={() => handleBook(unit.id)} 
                      />
                    )),
                  })}
                </section>
              </section>
            </section>
          </div>
        ),
      })}
    </FrontPageTemplate>
  );
}

export default AccommodationDetails;
