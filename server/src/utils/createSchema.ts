import { buildSchema } from "type-graphql";
import { RegisterResolver } from "../modules/user/RegisterResolver";
import { SkillResolver } from "../modules/skill/SkillResolver";
import { SocialResolver } from "../modules/social/SocialResolver";
import { JobResolver } from "../modules/job/JobResolver";
import { ProjectResolver } from "../modules/project/ProjectResolver";
import { CourseResolver } from "../modules/course/CourseResolver";
import { MeResolver } from "../modules/user/MeResolver";
import { ChangePasswordResolver } from "../modules/user/ChangePasswordResolver";
import { ForgotPasswordResolver } from "../modules/user/ForgotPasswordResolver";
import { LoginResolver } from "../modules/user/LoginResolver";
import { ConfirmUserResolver } from "../modules/user/ConfirmUserResolver";
import { LogoutResolver } from "../modules/user/LogoutResolver";


export const createSchema = () =>
  buildSchema({
    resolvers: [
      RegisterResolver,
      SkillResolver,
      SocialResolver,
      JobResolver,
      ProjectResolver,
      CourseResolver,
      MeResolver,
      ChangePasswordResolver,
      ForgotPasswordResolver,
      LoginResolver,
      ConfirmUserResolver,
      LogoutResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });