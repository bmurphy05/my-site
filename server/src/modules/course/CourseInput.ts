import { Field, InputType } from "type-graphql";
import { IsCourseAlreadyExist } from "./isCourseAlreadyExist";

@InputType()
export class CourseInput {
  @Field()
  @IsCourseAlreadyExist({ message: "course already exists" })
  title: string;

  @Field()
  semester: string;

  @Field()
  year: string;

  @Field()
  user: number;

  
}