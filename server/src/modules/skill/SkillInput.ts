import { Field, InputType } from "type-graphql";
import { IsSkillAlreadyExist } from "./isSkillAlreadyExist";

@InputType()
export class SkillInput {
  @Field()
  user: number;

  @Field()
  type: string;

  @Field()
  @IsSkillAlreadyExist({ message: "skill already exists" })
  title: string;

}