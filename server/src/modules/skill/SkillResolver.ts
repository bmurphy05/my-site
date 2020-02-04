import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Skill } from "../../entity/Skill";
import { SkillInput } from "./SkillInput";

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
    return Skill.find();
  }

  @Query(() => [Skill])
  async skill() {
    return Skill.find();
  }
}
