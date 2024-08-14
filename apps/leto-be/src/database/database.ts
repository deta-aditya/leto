import { Kysely } from "kysely";
import { AccommodationTable } from "./tables/accommodation";
import { UnitTable } from "./tables/unit";

export type Database = {
  accommodation: AccommodationTable;
  unit: UnitTable;
};

export type QueryBuilder = Kysely<Database>;
