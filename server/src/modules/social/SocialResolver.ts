import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Social } from "src/entity/Social";

@Resolver()
export class SocialResolver {
  @Mutation(() => Social)
  async addSocial(@Arg("input") linkedIn: string, github: string, user: number) {
    return Social.create({ linkedIn, github, user }).save();
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
