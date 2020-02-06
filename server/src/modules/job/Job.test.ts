import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../test-utils/testConn";
import { gCall } from "../../test-utils/gCall";
import { Job } from "../../entity/Job";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const jobMutation = `
mutation Job($data: JobInput!) {
  job(
    data: $data
  ) {
    id
    title
    location
    startDate
    endDate
    responsibilities
    user
  }
}
`;

describe("Job", () => {
  it("create job", async () => {
    const job = {
      title: faker.name.title(),
      location: faker.name.location(),
      startDate: faker.date.startDate(),
      endDate: faker.date.endDate(),
      responsibilities: faker.date.responsibilities(),
      user: faker.name.user()
    };

    const response = await gCall({
      source: jobMutation,
      variableValues: {
        data: job
      }
    });

    expect(response).toMatchObject({
      data: {
        job: {
          title: job.title,
          location: job.location,
          startDate: job.startDate,
          endDate: job.endDate,
          respnsibilities: job.responsibilities,
          user: job.user
        }
      }
    });

    const dbUser = await Job.findOne({ where: { title: job.title } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.title).toBe(job.title);
    expect(dbUser!.location).toBe(job.location);
    expect(dbUser!.startDate).toBe(job.startDate);
    expect(dbUser!.endDate).toBe(job.endDate);
    expect(dbUser!.responsibilities).toBe(job.responsibilities);
    expect(dbUser!.user).toBe(job.user);
  });
});