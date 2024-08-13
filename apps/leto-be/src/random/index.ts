import { GetRandomIntegerOfRange } from "@leto/core";

export const getRandomIntegerOfRange: GetRandomIntegerOfRange = max => {
  return Math.floor(Math.random() * max);
}
