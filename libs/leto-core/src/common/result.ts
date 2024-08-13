/**
 * Type Definitions
 */

import { Option, match as optionMatch } from "./option";

export type Result<TSuccess, TFailure> =
  | { kind: 'success', data: TSuccess }
  | { kind: 'failure', reason: TFailure };

/**
 * Constructors & Parsers
 */

export function Success<TSuccess, TFailure>
  (data: TSuccess): Result<TSuccess, TFailure> {
  return { kind: 'success', data };
}

export function Failure<TSuccess, TFailure>
  (reason: TFailure): Result<TSuccess, TFailure> {
  return { kind: 'failure', reason };
}

export function fromOption<TSuccess, TFailure>
  (option: Option<TSuccess>, ifNone: TFailure): Result<TSuccess, TFailure> {
  return optionMatch(option, {
    none: () => Failure(ifNone),
    some: value => Success(value),
  });
}

/**
 * Extractors & Selectors
 */

export function match<TSuccess, TFailure, TOutput>(
  result: Result<TSuccess, TFailure>,
  matcher: { 
    success: (data: TSuccess) => TOutput,
    failure: (reason: TFailure) => TOutput,
  }
) {
  switch (result.kind) {
    case 'success':
      return matcher.success(result.data);
    case 'failure':
      return matcher.failure(result.reason);
  }
}

export function map<TSuccessOld, TSuccessNew, TFailure>(
  result: Result<TSuccessOld, TFailure>,
  mapper: (data: TSuccessOld) => TSuccessNew,
): Result<TSuccessNew, TFailure> {
  return match(result, {
    success: data => Success(mapper(data)),
    failure: reason => Failure(reason),
  })
}

export function bind<TSuccessOld, TSuccessNew, TFailure>(
  result: Result<TSuccessOld, TFailure>,
  binder: (data: TSuccessOld) => Result<TSuccessNew, TFailure>,
): Result<TSuccessNew, TFailure> {
  return match(result, {
    success: data => binder(data),
    failure: reason => Failure(reason),
  });
}
