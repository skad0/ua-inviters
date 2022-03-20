import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table("invitees", (table) => {
		table.increments("id").primary();
		table.string("name").notNullable();
		table.string("location").notNullable();
		table.string("other_contacts").notNullable();
		table.string("phone").notNullable();
		table.boolean("has_animals").notNullable().defaultTo(false);
		table.integer("people_amount").notNullable().defaultTo(1);
		table.text("additional_notes").defaultTo("");
		table.bigInteger("tg_id").notNullable();
		table.string("tg_login").notNullable();
		table.boolean("is_invited").notNullable().defaultTo(false);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("invitees");
}
