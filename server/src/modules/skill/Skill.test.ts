import { Connection } from "typeorm";

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
      title: "C++",
      type: "language",
      user: 1
    };


    const response = await gCall({
      source: skillMutation,
      variableValues: {
        data: skill
      }
    });

    console.log(JSON.stringify(response));
    /*expect(response).toMatchObject({
      data: {
        project: {
          title: skill.title,
          type: skill.type,
          user: skill.user
        }
      }
    });
    */;

    const dbSkill = await Skill.findOne({ where: { title: skill.title } });
    expect(dbSkill).toBeDefined();
    expect(dbSkill!.title).toBe(skill.title);
    expect(dbSkill!.type).toBe(skill.type);
    expect(dbSkill!.user).toBe(skill.user);
  });
});