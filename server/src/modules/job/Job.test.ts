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
mutation addJob($title: String!, $location: String!, $startDate: String!, $endDate: String!, $responsibilities: String! $user: String!) {
  addJob(input: {
    id,
    title: $title,
    location: $location,
    startDate: $startDate,
    endDate: $endDate,
    responsibilities: $responsibilities,
    user: $user
  })
  {
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

    console.log(JSON.stringify(response));
    /*
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
    */

    const dbJob = await Job.findOne({ where: { title: job.title } });
    expect(dbJob).toBeDefined();
    expect(dbJob!.title).toBe(job.title);
    expect(dbJob!.location).toBe(job.location);
    expect(dbJob!.startDate).toBe(job.startDate);
    expect(dbJob!.endDate).toBe(job.endDate);
    expect(dbJob!.responsibilities).toBe(job.responsibilities);
    expect(dbJob!.user).toBe(job.user);
  });
});