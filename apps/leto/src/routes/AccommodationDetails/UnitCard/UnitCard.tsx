import { UnitDisplayItem } from "@leto/core";
import ShimmeredImage from "../../../components/ShimmeredImage";

export type UnitCardProps = {
  unit: UnitDisplayItem;
  onBookClick: () => void;
};

function UnitCard({ onBookClick, unit }: UnitCardProps) {
  return (
    <article key={unit.id} className="bg-white rounded-lg border border-gray-200 flex">
      <ShimmeredImage
        shimmerClassName="rounded-l-lg w-52" 
        className="rounded-l-lg w-52"
        src={unit.picture} 
        alt="Lorem Ipsum Dolor Sit Hotel" 
      />
      <div className="flex flex-col justify-between gap-10 flex-grow p-6">
        <div className="flex flex-col">
          <h2 className="text-xl">{unit.name}</h2>
          <div className="flex gap-1 items-baseline">
            <p className="text-2xl font-bold">Rp{unit.rate.toLocaleString()}</p>
            <p className="text-xs text-gray-500">/room/night</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onBookClick} 
            className="rounded-lg bg-blue-600 text-white py-3 px-8 transition hover:drop-shadow-xl hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </div>
    </article>
  )
}

export default UnitCard;
