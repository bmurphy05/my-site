import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Social } from "../../entity/Social";
import { SocialInput } from "./SocialInput";

@Resolver()
export class SocialResolver {
  @Mutation(() => Social)
  async addSocial(@Arg("input")
  {
    linkedIn,
    github,
    user
  }:SocialInput
  ){
    return Social.create({ 
      linkedIn, 
      github, 
      user 
    }).save();
  } 
 
  @Mutation(() => Boolean)
  async deleteSocial(@Arg("input", () => Int) id: number) {
    await Social.delete({ id: id });
    return true;
  }
  
  @Query(() => [Social])
  async socials() {
    return Social.find();
  }

  @Query(() => [Social])
  async social() {
    return Social.find();
  }
}
