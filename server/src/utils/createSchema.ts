import { buildSchema } from "type-graphql";
import { ProjectResolver } from "../modules/project/ProjectResolver";
import { SkillResolver } from "../modules/skill/SkillResolver";
import { SocialResolver } from "../modules/social/SocialResolver";
import { JobResolver } from "../modules/job/JobResolver";
import { RegisterResolver } from "../modules/user/RegisterResolver";
import { CourseResolver } from "../modules/course/CourseResolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      RegisterResolver,
      SkillResolver,
      SocialResolver,
      JobResolver,
      ProjectResolver,
      CourseResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });