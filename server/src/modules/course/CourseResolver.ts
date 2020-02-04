import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Course } from "../../entity/Course";
import { CourseInput } from "./CourseInput";

@Resolver()
export class CourseResolver {
  @Mutation(() => Course)
  async addCourse(@Arg("input") 
  {
    semester, 
    title, 
    user, 
    year
  }: CourseInput
  ){
    return Course.create({ 
      title, 
      semester, 
      year, 
      user 
    }).save();
  }
  
  @Mutation(() => Boolean)
  async deleteCourse(@Arg("input") id: number)  {
    await Course.delete({ id });
    return true;
  }

  @Query(() => [Course])
  async courses() {
    return Course.find();
  }

  @Query(() => [Course])
  async course() {
    return Course.find();
  }
}
