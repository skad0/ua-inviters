import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("hosts", (table) => {
		table.increments("id").primary();
		table.string("name").nullable();
		table.string("address").nullable();
		table.string("living_env").nullable();
		table.string("phone").nullable();
		table.boolean("has_animals").notNullable().defaultTo(false);
		table.boolean("can_animals").notNullable().defaultTo(false);
		table.boolean("vacant").notNullable().defaultTo(true);
		table.bigInteger("tg_id").notNullable();
		table.string("tg_login").notNullable();
		table.integer("current_question").nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("hosts");
}
