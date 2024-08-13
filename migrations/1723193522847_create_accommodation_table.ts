import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('accommodation')
		.addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
		.addColumn('name', 'varchar(255)', col => col.notNull())
		.addColumn('city', 'varchar(255)', col => col.notNull())
		.addColumn('country', 'varchar(255)', col => col.notNull())
		.addColumn('picture', 'varchar(255)', col => col.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('accommodation').execute();
}
