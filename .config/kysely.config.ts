import {
	MysqlDialect,
} from 'kysely'
import { defineConfig } from 'kysely-ctl'
import { createPool } from 'mysql2'

export default defineConfig({
	// replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
	dialect: new MysqlDialect({
		pool: createPool(process.env.DB_CONNECTION_STRING || ''),
	}),
	//   migrations: {
	//     migrationFolder: "migrations",
	//   },
	//   plugins: [],
	//   seeds: {
	//     seedFolder: "seeds",
	//   }
})
