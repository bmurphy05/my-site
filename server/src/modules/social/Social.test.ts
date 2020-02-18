import { Connection } from "typeorm";

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
    linkedIn
    github
    user
  }
}
`;

describe("Social", () => {
  it("create social", async () => {
    const social = {
      linkedIn: "linkedin.com/bmurphy05",
      github: "github.com/bmurphy05",
      user: 1
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
          linkedIn: social.linkedIn,
          github: social.github,
          user: social.user
        }
      }
    });

    const dbUser = await Social.findOne({ where: { linkedin: social.linkedIn , github: social.github,} });
    expect(dbUser).toBeDefined();
    expect(dbUser!.linkedIn).toBe(social.linkedIn);
    expect(dbUser!.github).toBe(social.github);
    expect(dbUser!.user).toBe(social.user);
  });
});