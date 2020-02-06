import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Course } from "../../entity/Course";
import { CourseInput } from "./CourseInput";
import { getRepository } from "typeorm";

@Resolver()
export class CourseResolver {
  @Mutation(() => Course)
  async addCourse(@Arg("input") 
  {
    title, 
    semester, 
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
    return getRepository(Course)
    .find({
        join: {
            alias: "course",
            leftJoinAndSelect: {
                user: "course.user",
            }
        }
    });
  }

  @Query(() => Course)
  async course(@Arg('id') id: string) {
    return getRepository(Course)
    .findOne({
        join: {
            alias: "course",
            leftJoinAndSelect: {
                user: "course.user",
            }
        }, where: { id }
    });
  }
}