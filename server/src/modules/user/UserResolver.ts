import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { UserInput } from "./register/UserInput";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async addUser(@Arg("input")
  {
    firstName,
    lastName, 
    email, 
    password, 
    underGraduate, 
    postGraduate, 
    summary, 
    image
  }: UserInput
  ) {
    return User.create({ 
      firstName, 
      lastName, 
      email, 
      password, 
      underGraduate, 
      postGraduate, 
      summary, 
      image 
    }).save();
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

  @Query(() => [User])
  async user() {
    return User.find();
  }
}