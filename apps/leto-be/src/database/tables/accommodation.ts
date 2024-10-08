import { Generated, JSONColumnType } from "kysely";

export type AccommodationTable = {
  id: Generated<number>;
  name: string;
  city: string;
  country: string;
  pictures: JSONColumnType<Array<string>>;
  star: number;
  description: string;
  facilities: JSONColumnType<Array<string>>;
};

