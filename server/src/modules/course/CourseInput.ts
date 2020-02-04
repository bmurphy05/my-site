import { Field, InputType } from "type-graphql";
import { IsCourseAlreadyExist } from "./isCourseAlreadyExist";

@InputType()
export class CourseInput {
  @Field()
  semester: string;

  @Field()
  @IsCourseAlreadyExist({ message: "course already exists" })
  title: string;

  @Field()
  user: number;

  @Field()
  year: string;
  
}