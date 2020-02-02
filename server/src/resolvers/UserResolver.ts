import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "src/entity/User";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async addUser(@Arg("input") firstName: string, lastName: string, email: string, password: string, underGraduate: string, postGraduate: string, summary: string, image: File, linkedIn: string, github: string ) {
    return User.create({ firstName, lastName, email, password, underGraduate, postGraduate, summary, image, linkedIn, github }).save();
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("input", () => Int) id: number) {
    await User.delete({ id: id });
    return true;
  }
  @Query(() => [User])
  async users() {
    return User.find();
  }
}