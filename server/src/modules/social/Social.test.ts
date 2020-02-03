import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../test-utils/testConn";
import { gCall } from "../../test-utils/gCall";
import { Social } from "../../entity/Social";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const socialMutation = `
mutation Social($data: SocialInput!) {
  social(
    data: $data
  ) {
    id
    github
    linkedIn
    user
  }
}
`;

describe("Social", () => {
  it("create social", async () => {
    const social = {
      github: faker.name.github(),
      linkedIn: faker.date.linkedIn(),
      user: faker.name.user()
    };

    const response = await gCall({
      source: socialMutation,
      variableValues: {
        data: social
      }
    });

    expect(response).toMatchObject({
      data: {
        project: {
          github: social.github,
          linkedIn: social.linkedIn,
          user: social.user
        }
      }
    });

    const dbUser = await Social.findOne({ where: { github: social.github, linkedin: social.linkedIn } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.github).toBe(social.github);
    expect(dbUser!.linkedIn).toBe(social.linkedIn);
    expect(dbUser!.user).toBe(social.user);
  });
});