import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Project } from "../../entity/Project";
import { ProjectInput } from "./ProjectInput";

@Resolver()
export class ProjectResolver {
  @Mutation(() => Project)
  async addProject(@Arg("input")
  {
    title, 
    description,
    startDate,
    endDate,
    link,
    github,
    user 
  }:ProjectInput
  ) {
    return Project.create({ 
      title, 
      startDate, 
      endDate, 
      description, 
      link, 
      github, 
      user 
    }).save();
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

  @Query(() => [Project])
  async project() {
    return Project.find();
  }
}
