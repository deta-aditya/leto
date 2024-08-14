import dayjs from 'dayjs';
import { Failure, Success } from "../../common/result";
import { CreateGetCheckoutDetails } from "./get-checkout-details";
import { UnexpectedError, ValidationError } from '../../common/errors';

const TAX_COMPONENT = 0.1;

export const createGetCheckoutDetails: CreateGetCheckoutDetails = 
  dependencies => async request => {
  if (request.rooms <= 0 || !Number.isInteger(request.rooms)) {
    return Failure(
      ValidationError('Rooms should be more a positive integer!')
    );
  }

  const checkInDate = dayjs(request.checkInDate);
  if (!checkInDate.isValid()) {
    return Failure(ValidationError('Check in date is not a valid date!'));
  }
  
  const checkOutDate = dayjs(request.checkOutDate);
  if (!checkOutDate.isValid()) {
    return Failure(ValidationError('Check in date is not a valid date!'));
  }

  const maybeUnit = await dependencies.getUnitById(request.unitId);

  if (maybeUnit.kind === 'none') {
    return Failure(
      ValidationError(`Unit with ID ${request.unitId} doesn't exist!`),
    );
  }

  const unit = maybeUnit.value;

  const maybeAccommodation 
    = await dependencies.getAccommodationById(unit.accommodationId);

  if (maybeAccommodation.kind === 'none') {
    return Failure(
      UnexpectedError(`Accommodation of Unit with ID ${request.unitId} does not exist! Data might be corrupt.`),
    );
  }

  const accommodation = maybeAccommodation.value;
  const subtotal = unit.rate * request.rooms;
  const taxPayment = subtotal * TAX_COMPONENT;

  return Success({
    accommodationLocation: `${accommodation.city}, ${accommodation.country}`,
    accommodationName: `${accommodation.name}`,
    accommodationPicture: `${accommodation.pictures[0]}`,
    durationInNights: checkOutDate.diff(checkInDate, 'day'),
    unitName: unit.name,
    taxPercentage: TAX_COMPONENT * 100,
    taxPayment,
    subtotal,
    total: subtotal + taxPayment,
  });
}
