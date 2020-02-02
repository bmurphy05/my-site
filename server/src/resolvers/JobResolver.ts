import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Job } from "src/entity/Job";

@Resolver()
export class JobResolver {
  @Mutation(() => Job)
  async addJob(@Arg("input") jobTitle: string, location: string, startDate: string, endDate: string, responsibilities: string, user: number) {
    return Job.create({ jobTitle, location, startDate, endDate, responsibilities, user }).save();
  }

  @Mutation(() => Boolean)
  async deleteJob(@Arg("input", () => Int) id: number) {
    await Job.delete({ id: id });
    return true;
  }

  @Query(() => [Job])
  async jobs() {
    return Job.find();
  }
}