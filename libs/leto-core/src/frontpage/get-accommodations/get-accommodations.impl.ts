import { match } from "../../common/option";
import { CreateGetAccommodations } from "./get-accommodations";

export const createGetAccommodations: CreateGetAccommodations 
  = dependencies => async request => {

  const accommodations = await match(request.searchQuery, {
    some: pattern => dependencies.getAccommodationsByPattern(pattern),
    none: () => dependencies.getRandomlyOrderedAccommodations(),
  });

  if (accommodations.length === 0) {
    return { accommodations: [] };
  }

  const ids = accommodations.map(accommodation => accommodation.id);

  const minRatesResult = 
    await dependencies.getMinimumUnitRatesByAccommodationsIds(ids);

  const accommodationDisplayItems = 
    accommodations.map((accommodation) => {
      const minimumRate = minRatesResult
        .find(result => result.accommodationId === accommodation.id)!.rate;
      const location = `${accommodation.city}, ${accommodation.country}`;
      const picture = accommodation.pictures[
        dependencies.getRandomIntegerOfRange(accommodation.pictures.length)
      ]
      
      return {
        id: accommodation.id,
        name: accommodation.name,
        picture: picture,
        location: location,
        rate: minimumRate,
      };
    });

  return {
    accommodations: accommodationDisplayItems,
  };
};
