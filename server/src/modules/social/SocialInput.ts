import { Field, InputType } from "type-graphql";

@InputType()
export class SocialInput {

  @Field()
  linkedIn: string;

  @Field()
  github: string;

  @Field()
  user: number;

}