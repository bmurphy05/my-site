import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Skill } from "../../entity/Skill";
import { SkillInput } from "./SkillInput";
import { getRepository } from "typeorm";

@Resolver()
export class SkillResolver {
  @Mutation(() => Skill)
  async addSkill(@Arg("input") 
  {
    title, 
    type, 
    user
  }:SkillInput
  ){
    return Skill.create({ 
      title, 
      type, 
      user 
    }).save();
  }

  @Mutation(() => Boolean)
  async deleteSkill(@Arg("input", () => Int) id: number) {
    await Skill.delete({ id: id });
    return true;
  }

  @Query(() => [Skill])
  async skills() {
    return getRepository(Skill)
    .find({
        join: {
            alias: "skill",
            leftJoinAndSelect: {
                user: "skill.user",
            }
        }
    });
  }

  @Query(() => [Skill])
  async skill(@Arg('id') id: string) {
    return getRepository(Skill)
    .findOne({
        join: {
            alias: "skill",
            leftJoinAndSelect: {
                user: "skill.user",
            }
        }, where: { id }
    });
  }
}