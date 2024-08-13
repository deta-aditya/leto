import { None, Some } from "../../common/option";
import { CreateGetAccommodationDetails } from "./get-accommodation-details";

export const createGetAccommodationDetails: CreateGetAccommodationDetails = 
  dependencies => async request => {
  const accommodationOption = 
    await dependencies.getAccommodationById(request.accommodationId);
  
  if (accommodationOption.kind === 'none') {
    return None();
  }

  const accommodation = accommodationOption.value;

  const units = 
    await dependencies.getUnitsByAccommodationId(request.accommodationId);

  return Some({
    accommodation: {
      description: accommodation.description,
      facilities: accommodation.facilities,
      location: `${accommodation.city}, ${accommodation.country}`,
      name: accommodation.name,
      pictures: accommodation.pictures,
      star: accommodation.star,
    },
    units: units.map(unit => ({
      id: unit.id,
      name: unit.name,
      picture: unit.picture,
      rate: unit.rate,
    }))
  })
};
