import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Project } from "../../entity/Project";
import { ProjectInput } from "./ProjectInput";
import { getRepository } from "typeorm";

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
  }: ProjectInput) {
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
    return getRepository(Project).find({
      join: {
        alias: "project",
        leftJoinAndSelect: {
          project: "project.user"
        }
      }
    });
  }

  @Query(() => Project)
  async project(@Arg("id") id: string) {
    return getRepository(Project).findOne({
      join: {
        alias: "project",
        leftJoinAndSelect: {
          project: "project.user"
        }
      },
      where: { id }
    });
  }
}
