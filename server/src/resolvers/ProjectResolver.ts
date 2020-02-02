import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Project } from "src/entity/Project";

@Resolver()
export class ProjectResolver {
  @Mutation(() => Project)
  async addProject(@Arg("input") projectTitle: string, description: string, startDate: string, endDate: string, link: string, github: string, user: number) {
    return Project.create({ projectTitle, description, startDate, endDate, link, github, user }).save();
  }

 
  @Mutation(() => Boolean)
  async deleteProject(@Arg("input", () => Int) id: number) {
    await Project.delete({ id: id });
    return true;
  }

  @Query(() => [Project])
  async projects() {
    return Project.find();
  }
}
