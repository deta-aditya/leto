import { sql } from "kysely";
import { 
  GetAccommodationsByPattern, 
  GetRandomlyOrderedAccommodations, 
  GetAccommodationById,
  Option,
} from "@leto/core";
import { db } from "../database.impl";

export const getAccommodationsByPattern: GetAccommodationsByPattern 
  = async pattern => {
  return await db()
    .selectFrom('accommodation')
    .where((eb) => eb.or([
      eb('accommodation.name', 'like', `%${pattern.toLowerCase()}%`),
      eb('accommodation.city', 'like', `%${pattern.toLowerCase()}%`),
      eb('accommodation.country', 'like', `%${pattern.toLowerCase()}%`)
    ]))
    .selectAll()
    .execute();
}

export const getRandomlyOrderedAccommodations: GetRandomlyOrderedAccommodations 
  = async () => {
  return await db()
    .selectFrom('accommodation')
    .orderBy(sql`rand()`)
    .selectAll()
    .execute();
}

export const getAccommodationById: GetAccommodationById = async (id) => {
  const result = await db()
    .selectFrom('accommodation')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();

  return Option.fromNullable(result);
}
