import { MysqlDialect, Kysely } from "kysely";
import { createPool } from "mysql2";
import { Option } from "@leto/core";
import { QueryBuilder, Database } from "./database";

let INSTANCE: Option.Option<QueryBuilder> = Option.None();

export async function initializeDatabase(connectionUri: string) {
  const dialect = new MysqlDialect({
    pool: createPool(connectionUri),
  });

  const db = new Kysely<Database>({
    dialect,
  });

  INSTANCE = Option.Some(db);

  return INSTANCE;
}

export function db() {
  return Option.match(INSTANCE, {
    some: db => db,
    none: () => {
      throw new Error('[Database] DB is not initialized yet!');
    },
  });
}
