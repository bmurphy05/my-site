import { Connection } from "typeorm";

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
      title: "Manager",
      location: "Yonkers, NY",
      startDate: "03/2013",
      endDate: "Present",
      responsibilities: "mow lawns",
      user: 1
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