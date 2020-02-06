import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../test-utils/testConn";
import { gCall } from "../../test-utils/gCall";
import { Skill } from "../../entity/Skill";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const skillMutation = `
mutation Skill($data: SkillInput!) {
  skill(
    data: $data
  ) {
    id
    title
    type
    user
  }
}
`;

describe("Skill", () => {
  it("create skill", async () => {
    const skill = {
      title: faker.name.title(),
      type: faker.date.type(),
      user: faker.name.user()
    };

    const response = await gCall({
      source: skillMutation,
      variableValues: {
        data: skill
      }
    });

    expect(response).toMatchObject({
      data: {
        project: {
          title: skill.title,
          type: skill.type,
          user: skill.user
        }
      }
    });

    const dbUser = await Skill.findOne({ where: { title: skill.title } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.title).toBe(skill.title);
    expect(dbUser!.type).toBe(skill.type);
    expect(dbUser!.user).toBe(skill.user);
  });
});