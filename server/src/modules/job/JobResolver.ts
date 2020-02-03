import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Job } from "src/entity/Job";

@Resolver()
export class JobResolver {
  @Mutation(() => Job)
  async addJob(@Arg("input") title: string, location: string, startDate: string, endDate: string, responsibilities: string, user: number) {
    return Job.create({ title, location, startDate, endDate, responsibilities, user }).save();
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

  @Query(() => [Job])
  async job() {
    return Job.find();
  }
}