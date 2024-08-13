import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable('unit')
		.addColumn('picture', 'varchar(255)')
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable('unit')
		.dropColumn('picture')
		.execute();
}
