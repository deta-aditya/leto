import { AccommodationDisplayItem } from "../../accommodation";
import { Option } from "../../common/option";
import { 
  GetAccommodationsByPattern, 
  GetMinimumUnitRatesByAccommodationsIds, 
  GetRandomIntegerOfRange, 
  GetRandomlyOrderedAccommodations, 
} from "../data-gateways";

export type GetAccommodationsRequest = {
  searchQuery: Option<string>;
};

export type GetAccommodationsResponse = {
  accommodations: AccommodationDisplayItem[];
};

export type GetAccommodationsDependencies = {
  getAccommodationsByPattern: GetAccommodationsByPattern;
  getRandomlyOrderedAccommodations: GetRandomlyOrderedAccommodations;
  getMinimumUnitRatesByAccommodationsIds: 
    GetMinimumUnitRatesByAccommodationsIds;
  getRandomIntegerOfRange: GetRandomIntegerOfRange;
};

export type CreateGetAccommodations
  = (dependencies: GetAccommodationsDependencies)
  => (request: GetAccommodationsRequest)
  => Promise<GetAccommodationsResponse>;
