import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";
import { File } from "@babel/types";

@InputType()
export class UserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsEmailAlreadyExist({ message: "email already in use" })
  email: string;

  @Field()
  password: string;

  @Field()
  underGraduate: string;

  @Field()
  postGraduate: string;

  @Field()
  summary: string;

  @Field()
  image: File;
}
