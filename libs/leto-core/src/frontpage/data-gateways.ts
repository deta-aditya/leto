import { Accommodation, AccommodationRateMap, Unit } from "../accommodation";
import { Option } from "../common/option";

export type GetAccommodationsByPattern = 
  (pattern: string) => Promise<Array<Accommodation>>;

export type GetRandomlyOrderedAccommodations =
  () => Promise<Array<Accommodation>>;

export type GetMinimumUnitRatesByAccommodationsIds =
  (ids: number[]) => Promise<Array<AccommodationRateMap>>;

export type GetAccommodationById = 
  (accommodationId: number) => Promise<Option<Accommodation>>;

export type GetUnitsByAccommodationId =
  (accommodationId: number) => Promise<Array<Unit>>;

export type GetUnitById = 
  (unitId: number) => Promise<Option<Unit>>;

export type GetRandomIntegerOfRange = (max: number) => number;
