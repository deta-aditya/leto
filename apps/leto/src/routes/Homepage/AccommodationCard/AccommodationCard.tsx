import { AccommodationDisplayItem } from '@leto/core';
import ShimmeredImage from '../../../components/ShimmeredImage';

export type AccommodationCardProps = {
  accommodation: AccommodationDisplayItem;
  onClick: () => void;
};

function AccommodationCard({ accommodation, onClick }: AccommodationCardProps) {
  const { location, name, picture, rate } = accommodation;

  return (
    <article 
      className="bg-white rounded-lg drop-shadow-xl hover:drop-shadow-2xl cursor-pointer transition"
      onClick={onClick}
    >
      <ShimmeredImage 
        src={picture} 
        alt={picture}
        shimmerClassName="rounded-t-lg h-60"
        className="rounded-t-lg"
      />
      <div className="p-4 flex flex-col gap-2">
        <div>
          <h2 className="text-lg" >{name}</h2>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <div className="flex gap-1 items-baseline">
          <p className="text-lg font-bold">Rp{rate.toLocaleString()}</p>
          <p className="text-sm text-gray-500">/room/night</p>
        </div>
      </div>
    </article>
  )
}

export default AccommodationCard;
