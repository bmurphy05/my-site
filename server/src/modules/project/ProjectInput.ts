import { Field, InputType } from "type-graphql";
import { IsProjectAlreadyExist } from "./isProjectAlreadyExist";

@InputType()
export class ProjectInput {

  @Field()
  @IsProjectAlreadyExist({ message: "project already exists" })
  title: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field()
  description: string;

  @Field()
  link: string;

  @Field()
  github: string;

  @Field()
  user: number;

  
}