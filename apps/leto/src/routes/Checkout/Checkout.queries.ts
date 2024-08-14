import { GetCheckoutDetailsResponse } from "@leto/core";
import { getCheckIn, getCheckOut, getRooms, getUnitId } from "../../helpers/front-page-parameters";

export async function getCheckoutDetails(searchParams: URLSearchParams) {
  const paramsForQuery = new URLSearchParams({
    unitId: getUnitId(searchParams) || '',
    checkInDate: getCheckIn(searchParams),
    checkOutDate: getCheckOut(searchParams),
    rooms: String(getRooms(searchParams)),
  });

  const fetchResponse = await fetch(
    `${import.meta.env.VITE_BE_LINK}/checkout?${paramsForQuery.toString()}`,
  );
  const jsonResponse = await fetchResponse.json();

  return jsonResponse as GetCheckoutDetailsResponse;
}
