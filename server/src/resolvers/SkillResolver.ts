import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Skill } from "src/entity/Skill";

@Resolver()
export class SkillResolver {
  @Mutation(() => Skill)
  async addSkill(@Arg("input") skill: string, type: string, user: number) {
    return Skill.create({ skill, type, user }).save();
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
}
