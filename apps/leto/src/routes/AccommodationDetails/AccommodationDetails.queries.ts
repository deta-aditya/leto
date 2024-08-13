import { GetAccommodationDetailsResponseData } from "@leto/core";

export async function getAccommodationDetails(accommodationId: string) {
  const fetchResponse = await fetch(
    `${import.meta.env.VITE_BE_LINK}/accommodations/${accommodationId}`,
  );
  const jsonResponse = await fetchResponse.json();

  return jsonResponse as GetAccommodationDetailsResponseData;
}
