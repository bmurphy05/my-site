import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Course } from "src/entity/Course";

@Resolver()
export class CourseResolver {
  @Mutation(() => Course)
  async addCourse(@Arg("input") courseTitle: string, semester: string, year: string, user: number) {
    return Course.create({ courseTitle, semester, year, user }).save();
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
}
