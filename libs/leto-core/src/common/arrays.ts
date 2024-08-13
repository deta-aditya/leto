export function range(length: number): number[] {
  return [...Array(length)].map((_, idx) => idx);
}
