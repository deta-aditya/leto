import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('unit')
		.addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
		.addColumn('accommodation_id', 'integer', col => col.notNull())
		.addColumn('name', 'varchar(255)', col => col.notNull())
		.addColumn('rate', 'decimal', col => col.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('unit').execute();
}
