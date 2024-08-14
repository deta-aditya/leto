/**
 * Type Definitions
 */

export type CommonError =
  | { kind: 'validation-error', reason: string }
  | { kind: 'unexpected-error', reason: string };

/**
 * Constructors & Parsers
 */

export function ValidationError(reason: string): CommonError {
  return { kind: 'validation-error', reason };
}

export function UnexpectedError(reason: string): CommonError {
  return { kind: 'unexpected-error', reason };
}

/**
 * Extractors & Selectors
 */

export function match<T>(error: CommonError, matcher: {
  validationError: (reason: string) => T,
  unexpectedError: (reason: string) => T,
}) {
  switch (error.kind) {
    case 'validation-error':
      return matcher.validationError(error.reason);
    case 'unexpected-error':
      return matcher.unexpectedError(error.reason);
  }
}
