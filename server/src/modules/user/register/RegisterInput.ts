import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";
import {PasswordMixin } from "../../shared/PasswordInput";
import { Length, IsEmail } from "class-validator";

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "email already in use" })
  email: string;

  @Field()
  underGraduate: string;

  @Field()
  postGraduate: string;

  @Field()
  summary: string;

  @Field()
  image: string;
}
