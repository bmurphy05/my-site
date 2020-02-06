import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Job } from "../../entity/Job";
import { JobInput } from "./JobInput";
import { getRepository } from "typeorm";

@Resolver()
export class JobResolver {
  @Mutation(() => Job)
  async addJob(@Arg("input")
  {
    title,
    location,
    startDate,
    endDate,
    responsibilities,
    user
  }: JobInput) {
    return Job.create({
      title,
      location,
      startDate,
      endDate,
      responsibilities,
      user
    }).save();
  }

  @Mutation(() => Boolean)
  async deleteJob(@Arg("input", () => Int) id: number) {
    await Job.delete({ id: id });
    return true;
  }

  @Query(() => [Job])
  async jobs() {
    return getRepository(Job)
    .find({
        join: {
            alias: "job",
            leftJoinAndSelect: {
                user: "job.user",
            }
        }
    });
  }

  @Query(() => Job)
  async job(@Arg('id') id: string) {
    return getRepository(Job)
    .findOne({
        join: {
            alias: "job",
            leftJoinAndSelect: {
                user: "job.user",
            }
        }, where: { id }
    });
  }
}

