import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table("inviters", (table) => {
		table.increments("id").primary();
		table.string("name").notNullable();
		table.string("address").notNullable();
		table.string("living_env").notNullable();
		table.string("phone").notNullable();
		table.boolean("has_animals").notNullable().defaultTo(false);
		table.boolean("can_animals").notNullable().defaultTo(false);
		table.boolean("vacant").notNullable().defaultTo(true);
		table.bigInteger("tg_id").notNullable();
		table.string("tg_login").notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("inviters");
}
