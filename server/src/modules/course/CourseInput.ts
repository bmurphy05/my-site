import { Field, InputType } from "type-graphql";
import { IsCourseAlreadyExist } from "./isCourseAlreadyExist";

@InputType()
export class CourseInput {
  @Field()
  semester: string;

  @Field()
  year: string;

  @Field()
  @IsCourseAlreadyExist({ message: "course already exists" })
  course: string;

  @Field()
  user: number;
  
}