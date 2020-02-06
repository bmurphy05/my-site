import { Field, InputType } from "type-graphql";
import { IsJobAlreadyExist } from "./isJobAlreadyExist";

@InputType()
export class JobInput {
  @Field()
  @IsJobAlreadyExist({ message: "job already exists" })
  title: string;

  @Field()
  location: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field()
  responsibilities: string;

  @Field()
  user: number;
  
}