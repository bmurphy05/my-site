module.exports = [
  {
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "my-site-dev",
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    dropSchema: true,
    logging: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  },
  {
    name: "production",
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: true,
    entities: ["dist/entity/**/*.ts"],
    migrations: ["dist/migration/**/*.ts"],
    subscribers: ["dist/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "dist/entity",
      migrationsDir: "dist/migration",
      subscribersDir: "dist/subscriber"
    }
  }
];
