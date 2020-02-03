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
    description
    startDate
    endDate
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
      description: faker.name.description(),
      startDate: faker.date.startDate(),
      endDate: faker.date.endDate(),
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
          description: project.description,
          startDate: project.startDate,
          endDate: project.endDate,
          link: project.link,
          github: project.github,
          user: project.user
        }
      }
    });

    const dbUser = await Project.findOne({ where: { title: project.title } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.title).toBe(project.title);
    expect(dbUser!.description).toBe(project.description);
    expect(dbUser!.startDate).toBe(project.startDate);
    expect(dbUser!.endDate).toBe(project.endDate);
    expect(dbUser!.link).toBe(project.link);
    expect(dbUser!.github).toBe(project.github);
    expect(dbUser!.user).toBe(project.user);
  });
});