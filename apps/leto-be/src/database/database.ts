import { Kysely } from "kysely";
import { AccommodationTable, UnitTable } from "./tables/accommodation";

export type Database = {
  accommodation: AccommodationTable;
  unit: UnitTable;
};

export type QueryBuilder = Kysely<Database>;
