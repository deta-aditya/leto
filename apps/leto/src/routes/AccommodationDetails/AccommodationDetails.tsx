import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CheckIcon, StarIcon } from "@heroicons/react/24/solid";
import { Arrays, Option } from "@leto/core";
import FrontPageTemplate from "../../components/FrontPageTemplate";
import ShimmeredImage from "../../components/ShimmeredImage";
import { getAccommodationDetails } from "./AccommodationDetails.queries";
import UnitCard from "./UnitCard/UnitCard";
import { UnitCardLoading } from "./UnitCard";

function AccommodationDetails() {
  const { accomId } = useParams();

  if (!accomId) {
    throw new Error('Impossible page access! "accomId" should always exist in this page.');
  }

  const { data, error } = useQuery({
    queryKey: ['accommodation-details', accomId],
    queryFn: () => getAccommodationDetails(accomId),
  });

  const maybeError = Option.fromNullOrUndefined(error);
  const maybeData = Option.fromNullOrUndefined(data);

  const handleBook = (unitId: number) => {
    //
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
          </div>
        ),
      })}
    </FrontPageTemplate>
  );
}

export default AccommodationDetails;
