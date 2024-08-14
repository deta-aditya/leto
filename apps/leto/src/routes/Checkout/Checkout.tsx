import dayjs from "dayjs";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import ShimmeredImage from "../../components/ShimmeredImage";
import { getCheckIn, getCheckOut, getRooms, getUnitId } from "../../helpers/front-page-parameters";
import { getCheckoutDetails } from "./Checkout.queries";

function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const unitId = getUnitId(searchParams);
  const checkIn = dayjs(getCheckIn(searchParams));
  const checkOut = dayjs(getCheckOut(searchParams));
  const rooms = getRooms(searchParams);

  const { data, error } = useQuery({
    queryKey: ['checkout-details', unitId],
    queryFn: () => getCheckoutDetails(searchParams),
    enabled: unitId !== null,
  })

  useEffect(() => {
    if (!unitId) navigate('/')
  }, [unitId])

  return (
    <main className="bg-gradient-to-b py-14 from-blue-700 to-blue-500 h-screen">
      <div className="container mx-auto flex flex-col gap-10 bg-white drop-shadow rounded-lg p-8">
        <nav className="flex justify-between items-center">
          <Link to="/">
            <h1 className="logo text-4xl text-blue-600">Leto</h1>
          </Link>
          <UserCircleIcon className="size-8 text-black" />
        </nav>
        <h1 className="text-4xl">Payment Checkout</h1>
        <section className="flex gap-8">
          <ShimmeredImage 
            shimmerClassName="rounded-lg w-48 h-32"
            className="rounded-lg h-32"
            src={data?.accommodationPicture}
          />
          <div className="flex flex-col flex-grow gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl">{data?.accommodationName}</h2>
              <h2 className="text-lg text-gray-500">{data?.accommodationLocation}</h2>
            </div>
            <section className="grid grid-cols-5 items-center gap-y-2">
              <div className="flex flex-col">
                <span className="text-gray-500">Rooms</span>
                <div className="flex items-center gap-2">
                <span className="text-lg">{rooms} &times; Deluxe Room</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Check in</span>
                <span className="text-lg">{checkIn.format('ddd, D MMM YYYY')}</span>
              </div>
              <div className="flex flex-col">
              <span className="text-gray-500">Check out</span>
                <span className="text-lg">{checkOut.format('ddd, D MMM YYYY')}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Duration</span>
                <span className="text-lg">{data?.durationInNights} Night(s)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-right">Subtotal</span>
                <span className="text-lg font-bold text-right">Rp{data?.subtotal?.toLocaleString()}</span>
              </div>
              <div className="col-start-4">
                <span className="text-gray-500">{data?.taxPercentage}% Service Tax</span>
              </div>
              <div className="flex justify-end">
                <span className="text-lg font-bold">Rp{data?.taxPayment?.toLocaleString()}</span>
              </div>
              <div className="col-start-4">
                <span className="text-lg">Total</span>
              </div>
              <div className="flex justify-end mt-4">
                <span className="text-lg font-bold text-right text-red-500">Rp{data?.total?.toLocaleString()}</span>
              </div>
            </section>
            <section className="flex justify-between items-end mt-10">
              <div className="flex flex-col gap-2">
                <span className="text-gray-500">Payment Method</span>
                <select className="p-4 rounded-lg border w-96">
                  <option value="1">Credit Card</option>
                  <option value="2">Virtual Account</option>
                  <option value="3">E-Wallet</option>
                  <option value="4">Pay on site</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  className="rounded-lg bg-white text-lg border border-gray-200 py-3 px-8 transition hover:drop-shadow-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg text-lg bg-blue-600 text-white py-3 px-8 transition hover:drop-shadow-xl hover:bg-blue-700"
                >
                  Pay Now
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Checkout;
