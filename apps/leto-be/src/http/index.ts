import { Express } from 'express';
import { getAccommodationDetailsHttpController, getAccommodationsHttpController } from './frontpage';
import { getCheckoutDetailsHttpController } from './frontpage/get-checkout-details.ctrl';

export function registerControllersToExpress(app: Express) {
  app.get('/accommodations', getAccommodationsHttpController);
  app.get('/accommodations/:accommodationId', getAccommodationDetailsHttpController);
  app.get('/checkout', getCheckoutDetailsHttpController);
}
