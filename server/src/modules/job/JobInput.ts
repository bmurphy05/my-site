import { Field, InputType } from "type-graphql";
import { IsJobAlreadyExist } from "./isJobAlreadyExist";

@InputType()
export class JobInput {
  @Field()
  location: string;

  @Field()
  startDate: string;

  @Field()
  @IsJobAlreadyExist({ message: "job already exists" })
  title: string;

  @Field()
  endDate: string;

  @Field()
  responsibilities: string;

  @Field()
  user: number;
  
}