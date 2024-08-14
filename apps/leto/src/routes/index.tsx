import { RouteObject } from "react-router-dom";
import Homepage from "./Homepage";
import Checkout from "./Checkout";
import AccommodationDetails from "./AccommodationDetails";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/accom/:accomId',
    element: <AccommodationDetails />,
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/my',
    element: <div>My Bookings</div>
  },
  {
    path: '/bookings/:bookId',
    element: <div>Booking Details</div>
  },
];
