import { GetAccommodationsResponse, Option } from "@leto/core";

export async function getAccommodations(searchQuery: Option.Option<string>) {
  const searchParams = new URLSearchParams();
  
  Option.match(searchQuery, {
    some: value => searchParams.set('searchQuery', value),
    none: () => {},
  })

  const fetchResponse = await fetch(
    `${import.meta.env.VITE_BE_LINK}/accommodations?` + searchParams.toString(),
  );
  const jsonResponse = await fetchResponse.json();

  return jsonResponse as GetAccommodationsResponse;
}
