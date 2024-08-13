import { AccommodationDisplayItem, GetAccommodationsResponse } from "@leto/core";

/**
 * Query Params Mutation
 */

export const DESTINATION_QUERY_PARAMS_KEY = 'd' as const;
export const CHECK_IN_QUERY_PARAMS_KEY = 'ci' as const;
export const CHECK_OUT_QUERY_PARAMS_KEY = 'co' as const;
export const ROOMS_QUERY_PARAMS_KEY = 'r' as const;

type QueryParamsKey =
  | typeof DESTINATION_QUERY_PARAMS_KEY
  | typeof CHECK_IN_QUERY_PARAMS_KEY
  | typeof CHECK_OUT_QUERY_PARAMS_KEY
  | typeof ROOMS_QUERY_PARAMS_KEY;

export const DESTINATION_DEBOUNCE_DURATION = 1000;

export function replaceSearchParams(
  searchParams: URLSearchParams,
  key: QueryParamsKey,
  value?: string,
) {
  const newSearchParams = new URLSearchParams(searchParams);

  if (value) {
    searchParams.set(key, value);
  } else {
    searchParams.delete(key);
  }

  return newSearchParams;
}

/**
 * Async List Acommodations Data
 */

type AsyncListAccommodationsData =
  | { kind: 'loading' }
  | { kind: 'success-has-data', value: AccommodationDisplayItem[] }
  | { kind: 'success-empty' }
  | { kind: 'error', reason: string }

export function createAsyncListData(params: {
  loading: boolean,
  error?: unknown,
  data?: GetAccommodationsResponse,
}): AsyncListAccommodationsData {
  if (params.loading) {
    return { kind: 'loading' };
  }

  if (params.error) {
    const reason = params.error instanceof Error 
      ? params.error.message
      : JSON.stringify(params.error);

    return { kind: 'error', reason };
  }

  if (params.data && params.data.accommodations.length > 0) {
    return { kind: 'success-has-data', value: params.data.accommodations };
  }

  return { kind: 'success-empty' };
}

export function matchAsyncListData<T>(
  data: AsyncListAccommodationsData,
  matcher: {
    loading: () => T,
    successHasData: (data: AccommodationDisplayItem[]) => T,
    successEmpty: () => T,
    error: (reason: string) => T,
  }
) {
  switch (data.kind) {
    case 'loading':
      return matcher.loading();
    case 'error':
      return matcher.error(data.reason);
    case 'success-empty':
      return matcher.successEmpty();
    case 'success-has-data':
      return matcher.successHasData(data.value);
  }
}
