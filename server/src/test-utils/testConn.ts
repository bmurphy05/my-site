import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "my-site-dev-test-example",
    synchronize: drop,
    dropSchema: drop,
    entities: ["src/entity/**/*.ts"]
  });
};