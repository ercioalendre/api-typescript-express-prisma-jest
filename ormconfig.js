const appMode = process.env.NODE_ENV === "production" ? "dist" : "src";
const dropSchema = process.env.TYPEORM_DROP_SCHEMA === "true" ? true : false;
const migrationsRun = process.env.TYPEORM_MIGRATIONS_RUN === "true" ? true : false;
const logging = process.env.TYPEORM_LOGGING === "true" ? true : false;
const synchronize = process.env.TYPEORM_SYNCHRONIZE === "true" ? true : false;

module.exports = {
  type: process.env.DATABASE_TYPE || "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize,

  /* Log settings */
  logging,
  logger: "file",

  /* Set true for testings */
  dropSchema,
  migrationsRun,

  entities: [`./${appMode}/database/typeorm/entities/*`],
  migrations: [`./${appMode}/database/typeorm/migrations/*.{js,ts}`],
  cli: {
    migrationsDir: `./${appMode}/database/typeorm/migrations`,
  },
};