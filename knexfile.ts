import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
	development: {
		client: "postgresql",
		connection: {
			database: "ua_inviters_dev",
			user: "ua",
			password: "1",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: __dirname + "/src/db/migrations",
		},
		debug: true,
	},

	production: {
		client: "postgresql",
		connection: {
			database: "ua_inviters",
			user: "ua",
			password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};

export default config;
