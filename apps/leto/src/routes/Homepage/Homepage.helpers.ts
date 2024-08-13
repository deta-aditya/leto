import { AccommodationDisplayItem, GetAccommodationsResponse } from "@leto/core";

/**
 * Destination Debounce Duration
 */

export const DESTINATION_DEBOUNCE_DURATION = 1000;

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
