/**
 * Type Definitions
 */

export type Option<T> = 
  | { kind: 'some', value: T }
  | { kind: 'none' };

/**
 * Constructors & Parsers
 */

export function Some<T>(value: T): Option<T> {
  return { kind: 'some', value };
}

export function None<T>(): Option<T> {
  return { kind: 'none' };
}

export function fromNullable<T>(value: T | null | undefined): Option<T> {
  return value === null || value === undefined ? None() : Some(value);
}

/**
 * Extractors & Selectors
 */

export function match<T, U>(option: Option<T>, matcher: { 
  none: () => U, 
  some: (value: T) => U,
}) {
  switch (option.kind) {
    case 'none':
      return matcher.none();
    case 'some':
      return matcher.some(option.value);
  }
}

export function map<T, U>(option: Option<T>, mapper: (value: T) => U): Option<U> {
  return match(option, {
    some: value => Some(mapper(value)),
    none: () => None(),
  });
}
