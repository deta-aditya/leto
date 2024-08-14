import { Generated } from "kysely";

export type UnitTable = {
  id: Generated<number>;
  name: string;
  rate: number;
  accommodation_id: number;
  picture: string;
};
