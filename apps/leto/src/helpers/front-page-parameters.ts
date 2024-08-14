import { Option } from "@leto/core";
import dayjs from "dayjs";
import { ChangeEvent } from "react";

export const DESTINATION_QUERY_PARAMS_KEY = 'd' as const;
export const CHECK_IN_QUERY_PARAMS_KEY = 'ci' as const;
export const CHECK_OUT_QUERY_PARAMS_KEY = 'co' as const;
export const ROOMS_QUERY_PARAMS_KEY = 'r' as const;
export const UNIT_ID_QUERY_PARAMS_KEY = 'unit-id' as const;

type QueryParamsKey =
  | typeof DESTINATION_QUERY_PARAMS_KEY
  | typeof CHECK_IN_QUERY_PARAMS_KEY
  | typeof CHECK_OUT_QUERY_PARAMS_KEY
  | typeof ROOMS_QUERY_PARAMS_KEY;

export function getDestination(searchParams: URLSearchParams) {
  return Option.fromNullable(
    searchParams.get(DESTINATION_QUERY_PARAMS_KEY)
  );
}

export function getCheckIn(searchParams: URLSearchParams, now = dayjs) {
  return searchParams.has(CHECK_IN_QUERY_PARAMS_KEY) 
    ? searchParams.get(CHECK_IN_QUERY_PARAMS_KEY)!
    : now().format('YYYY-MM-DD');
}

export function getCheckOut(searchParams: URLSearchParams, now = dayjs) {
  return searchParams.has(CHECK_OUT_QUERY_PARAMS_KEY) 
    ? searchParams.get(CHECK_OUT_QUERY_PARAMS_KEY)!
    : now().add(1, 'day').format('YYYY-MM-DD');
}

export function getRooms(searchParams: URLSearchParams) {
  return Number(searchParams.get(ROOMS_QUERY_PARAMS_KEY)) || 1
}

export function getUnitId(searchParams: URLSearchParams) {
  return searchParams.get(UNIT_ID_QUERY_PARAMS_KEY);
}

const createEventHandler = (
  key: QueryParamsKey,
  searchParams: URLSearchParams,
  saveSearchParams: (searchParams: URLSearchParams) => void,
) => (event: ChangeEvent<HTMLInputElement>) => {
  const newSearchParams = new URLSearchParams(searchParams);

  if (event.target.value) {
    newSearchParams.set(key, event.target.value);
  } else {
    newSearchParams.delete(key);
  }

  saveSearchParams(newSearchParams);
}

export const createDestinationEventHandler = (
  searchParams: URLSearchParams,
  saveSearchParams: (searchParams: URLSearchParams) => void,
) => createEventHandler(
  DESTINATION_QUERY_PARAMS_KEY, 
  searchParams, 
  saveSearchParams,
);

export const createCheckInEventHandler = (
  searchParams: URLSearchParams,
  saveSearchParams: (searchParams: URLSearchParams) => void,
) => createEventHandler(
  CHECK_IN_QUERY_PARAMS_KEY, 
  searchParams, 
  saveSearchParams,
);

export const createCheckOutEventHandler = (
  searchParams: URLSearchParams,
  saveSearchParams: (searchParams: URLSearchParams) => void,
) => createEventHandler(
  CHECK_OUT_QUERY_PARAMS_KEY, 
  searchParams, 
  saveSearchParams,
);

export const createRoomsEventHandler = (
  searchParams: URLSearchParams,
  saveSearchParams: (searchParams: URLSearchParams) => void,
) => createEventHandler(
  ROOMS_QUERY_PARAMS_KEY, 
  searchParams, 
  saveSearchParams,
);
