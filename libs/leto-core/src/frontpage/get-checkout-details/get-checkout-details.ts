import { CommonError } from "../../common/errors";
import { Result } from "../../common/result";
import { GetAccommodationById, GetUnitById } from "../data-gateways";

export type GetCheckoutDetailsRequest = {
  unitId: number;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
};

export type GetCheckoutDetailsResponse = {
  accommodationName: string;
  accommodationLocation: string;
  accommodationPicture: string;
  unitName: string;
  durationInNights: number;
  subtotal: number;
  taxPayment: number;
  taxPercentage: number;
  total: number;
};

export type GetCheckoutDetailsDependencies = {
  getUnitById: GetUnitById;
  getAccommodationById: GetAccommodationById;
};

export type CreateGetCheckoutDetails
  = (dependencies: GetCheckoutDetailsDependencies)
  => (request: GetCheckoutDetailsRequest)
  => Promise<Result<GetCheckoutDetailsResponse, CommonError>>;
