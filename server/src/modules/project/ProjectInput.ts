import { Field, InputType } from "type-graphql";
import { IsProjectAlreadyExist } from "./isProjectAlreadyExist";

@InputType()
export class ProjectInput {
  @Field()
  description: string;

  @Field()
  startDate: string;

  @Field()
  @IsProjectAlreadyExist({ message: "project already exists" })
  title: string;

  @Field()
  endDate: string;

  @Field()
  link: string;

  @Field()
  github: string;

  @Field()
  user: number;

  
}