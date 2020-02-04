import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Job } from "../../entity/Job";
import { JobInput } from "./JobInput";

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
  }:JobInput
  ) {
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
    return Job.find();
  }

  @Query(() => [Job])
  async job() {
    return Job.find();
  }
}