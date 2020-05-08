import { Connection } from "typeorm";

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
      title: "Manager",
      startDate: "03/2013",
      endDate: "Present",
      description: "mow lawns",
      link: "project1.html",
      github: "github.com/bmurphy05",
      user: 1
    };


    const response = await gCall({
      source: projectMutation,
      variableValues: {
        data: project
      }
    });

    console.log(JSON.stringify(response));
    /*
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
    */

    const dbProject = await Project.findOne({ where: { title: project.title } });
    expect(dbProject).toBeDefined();
    expect(dbProject!.title).toBe(project.title);
    expect(dbProject!.startDate).toBe(project.startDate);
    expect(dbProject!.endDate).toBe(project.endDate);
    expect(dbProject!.description).toBe(project.description);
    expect(dbProject!.link).toBe(project.link);
    expect(dbProject!.github).toBe(project.github);
    expect(dbProject!.user).toBe(project.user);
  });
});