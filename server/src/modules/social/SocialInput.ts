import { Field, InputType } from "type-graphql";

@InputType()
export class SocialInput {
  @Field()
  user: number;

  @Field()
  linkedIn: string;

  @Field()
  github: string;

}