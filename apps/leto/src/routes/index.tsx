import { RouteObject } from "react-router-dom";
import Homepage from "./Homepage";
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
    path: '/book/:bookId',
    children: [
      {
        path: 'checkout',
        element: <div>Checkout</div>,
      },
      {
        path: 'payment',
        element: <div>Payment</div>,
      },
      {
        path: 'finished',
        element: <div>Finished</div>,
      },
    ]
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
