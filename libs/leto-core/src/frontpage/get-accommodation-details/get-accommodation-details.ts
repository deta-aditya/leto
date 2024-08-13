import { 
  AccommodationDisplayDetails, 
  UnitDisplayItem, 
} from "../../accommodation";
import { Option } from "../../common/option";
import { 
  GetAccommodationById, 
  GetUnitsByAccommodationId, 
} from "../data-gateways";

export type GetAccommodationDetailsRequest = {
  accommodationId: number;
};

export type GetAccommodationDetailsResponse = Option<
  GetAccommodationDetailsResponseData
>;

export type GetAccommodationDetailsResponseData = {
  accommodation: AccommodationDisplayDetails,
  units: UnitDisplayItem[];
};

export type GetAccommodationDetailsDependencies = {
  getAccommodationById: GetAccommodationById;
  getUnitsByAccommodationId: GetUnitsByAccommodationId;
};

export type CreateGetAccommodationDetails
  = (dependencies: GetAccommodationDetailsDependencies)
  => (request: GetAccommodationDetailsRequest)
  => Promise<GetAccommodationDetailsResponse>;
