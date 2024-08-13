import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable('accommodation')
		.dropColumn('picture')
		.addColumn('pictures', 'json', col => col.notNull())
		.addColumn('star', 'integer', col => col.notNull())
		.addColumn('description', 'text', col => col.notNull())
		.addColumn('facilities', 'json', col => col.notNull())
		.execute();		
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable('accommodation')
		.addColumn('picture', 'varchar(255)', col => col.notNull())
		.dropColumn('pictures')
		.dropColumn('star')
		.dropColumn('description')
		.dropColumn('facilities')
		.execute();
}
