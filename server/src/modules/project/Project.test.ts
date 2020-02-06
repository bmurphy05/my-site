import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../test-utils/testConn";
import { gCall } from "../../test-utils/gCall";
import { Project } from "../../entity/Project";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const projectMutation = `
mutation Project($data: ProjectInput!) {
  project(
    data: $data
  ) {
    id
    title
    startDate
    endDate
    description
    link
    github
    user
  }
}
`;

describe("Project", () => {
  it("create project", async () => {
    const project = {
      title: faker.name.title(),
      startDate: faker.date.startDate(),
      endDate: faker.date.endDate(),
      description: faker.name.description(),
      link: faker.date.link(),
      github: faker.date.github(),
      user: faker.name.user()
    };

    const response = await gCall({
      source: projectMutation,
      variableValues: {
        data: project
      }
    });

    expect(response).toMatchObject({
      data: {
        project: {
          title: project.title,
          startDate: project.startDate,
          endDate: project.endDate,
          description: project.description,
          link: project.link,
          github: project.github,
          user: project.user
        }
      }
    });

    const dbUser = await Project.findOne({ where: { title: project.title } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.title).toBe(project.title);
    expect(dbUser!.startDate).toBe(project.startDate);
    expect(dbUser!.endDate).toBe(project.endDate);
    expect(dbUser!.description).toBe(project.description);
    expect(dbUser!.link).toBe(project.link);
    expect(dbUser!.github).toBe(project.github);
    expect(dbUser!.user).toBe(project.user);
  });
});