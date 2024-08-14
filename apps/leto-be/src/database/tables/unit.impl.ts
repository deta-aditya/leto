import { GetMinimumUnitRatesByAccommodationsIds, GetUnitById, GetUnitsByAccommodationId, Option } from "@leto/core";
import { db } from "../database.impl";

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

  return result.map(record => ({
    accommodationId: record.accommodation_id,
    rate: Number(record.rate),
  }));
};
  
export const getUnitsByAccommodationId: GetUnitsByAccommodationId 
  = async (id) => {
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
};

export const getUnitById: GetUnitById = async (id) => {
  const result = await db()
    .selectFrom('unit')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();

  return Option.map(Option.fromNullable(result), record => ({
    id: record.id,
    name: record.name,
    picture: record.picture,
    accommodationId: record.accommodation_id,
    rate: Number(record.rate),
  }));
};
