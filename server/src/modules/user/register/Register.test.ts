import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";
import { User } from "../../../entity/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!) {
  user(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    password
    underGraduate
    postGraduate
    summary
    image
  }
}
`;

describe("Register", () => {
  it("create user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      underGraduate: faker.internet.underGraduate(),
      postGraduate: faker.internet.postGraduate(),
      summary: faker.internet.summary(),
      image: faker.internet.image()

    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          underGraduate: user.underGraduate, 
          postGraduate: user.postGraduate,
          summary: user.summary,
          image: user.image
        }
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.firstName).toBe(user.firstName);
    expect(dbUser!.lastName).toBe(user.lastName);
    expect(dbUser!.email).toBe(user.email);
    expect(dbUser!.password).toBe(user.password);
    expect(dbUser!.underGraduate).toBe(user.underGraduate);
    expect(dbUser!.postGraduate).toBe(user.postGraduate);
    expect(dbUser!.summary).toBe(user.summary);
    expect(dbUser!.image).toBe(user.image);
  });
});