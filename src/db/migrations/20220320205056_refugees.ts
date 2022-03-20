import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("refugees", (table) => {
		table.increments("id").primary();
		table.string("name").nullable();
		table.string("location").nullable();
		table.string("other_contacts").nullable();
		table.string("phone").nullable();
		table.boolean("has_animals").nullable().defaultTo(false);
		table.integer("people_amount").nullable().defaultTo(1);
		table.text("additional_notes").defaultTo("");
		table.bigInteger("tg_id").notNullable();
		table.string("tg_login").notNullable();
		table.boolean("is_invited").notNullable().defaultTo(false);
		table.integer("current_question").nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("refugees");
}
