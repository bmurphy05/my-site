import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Social } from "../../entity/Social";
import { SocialInput } from "./SocialInput";
import { getRepository } from "typeorm";

@Resolver()
export class SocialResolver {
  @Mutation(() => Social)
  async addSocial(@Arg("input")
  {
    linkedIn,
    github,
    user
  }: SocialInput) {
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
    return getRepository(Social)
    .find({
        join: {
            alias: "social",
            leftJoinAndSelect: {
                user: "social.user",
            }
        }
    });
  }

  @Query(() => Social)
  async social(@Arg("id") id: string) {
    return getRepository(Social)
    .findOne({
        join: {
            alias: "social",
            leftJoinAndSelect: {
                user: "social.user",
            }
        }, where: { id }
    });
  }
}
