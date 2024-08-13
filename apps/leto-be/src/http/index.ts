import { Express } from 'express';
import { getAccommodationDetailsHttpController, getAccommodationsHttpController } from './homepage';

export function registerControllersToExpress(app: Express) {
  app.get('/accommodations', getAccommodationsHttpController);
  app.get('/accommodations/:accommodationId', getAccommodationDetailsHttpController);
}
