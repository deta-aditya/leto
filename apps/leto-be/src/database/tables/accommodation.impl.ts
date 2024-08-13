import { sql } from "kysely";
import { 
  GetAccommodationsByPattern, 
  GetRandomlyOrderedAccommodations, 
  GetMinimumUnitRatesByAccommodationsIds,
  GetAccommodationById,
  GetUnitsByAccommodationId, 
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

export const 
  getMinimumUnitRatesByAccommodationsIds: GetMinimumUnitRatesByAccommodationsIds
  = async (ids) => {
  const result = await db()
    .selectFrom('unit')
    .where('accommodation_id', 'in', ids)
    .select('accommodation_id')
    .select(({ fn }) => fn.min('unit.rate').as('rate'))
    .groupBy('accommodation_id')
    .execute();

  return result.map(item => ({
    accommodationId: item.accommodation_id,
    rate: Number(item.rate),
  }));
};

export const getAccommodationById: GetAccommodationById = async (id) => {
  const result = await db()
    .selectFrom('accommodation')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();

  return Option.fromNullOrUndefined(result);
}

export const getUnitsByAccommodationId: GetUnitsByAccommodationId = async (id) => {
  const result = await db()
    .selectFrom('unit')
    .selectAll()
    .where('accommodation_id', '=', id)
    .execute();

  return result.map(record => ({
    id: record.id,
    name: record.name,
    picture: record.picture,
    accommodationId: record.accommodation_id,
    rate: Number(record.rate),
  }));
}
