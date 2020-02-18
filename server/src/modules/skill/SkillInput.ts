import { Field, InputType } from "type-graphql";
import { IsSkillAlreadyExist } from "./isSkillAlreadyExist";

@InputType()
export class SkillInput {
  @Field()
  @IsSkillAlreadyExist({ message: "skill already exists" })
  title: string;

  @Field()
  type: string;

  @Field()
  user: number;

}