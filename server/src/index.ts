import "dotenv/config";
import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./modules/user/RegisterResolver";
import { CourseResolver } from "./modules/course/CourseResolver";
import { JobResolver } from "./modules/job/JobResolver";
import { SkillResolver } from "./modules/skill/SkillResolver";
import { SocialResolver } from "./modules/social/SocialResolver";
import { ProjectResolver } from "./modules/project/ProjectResolver";

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...options, name: "default" });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CourseResolver, JobResolver, RegisterResolver, SkillResolver, SocialResolver, ProjectResolver],
      validate: true
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
