import { Connection } from "typeorm";

import { testConn } from "../../test-utils/testConn";
import { gCall } from "../../test-utils/gCall";
import { Course } from "../../entity/Course";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const courseMutation = `
mutation Course($data: CourseInput!) {
  course(
    data: $data
  ) {
    id
    semester
    title
    user
    year
  }
}
`;

describe("Course", () => {
  it("create course", async () => {
    const course = {
      title: "Cloud Computing",
      semester: "spring",
      year: 2016,
      user: 1
    };

    const response = await gCall({
      source: courseMutation,
      variableValues: {
        data: course
      }
    });

    expect(response).toMatchObject({
      data: {
        course: {
          semester: course.semester,
          title: course.title,
          user: course.user,
          year: course.year,
        }
      }
    });

    const dbUser = await Course.findOne({ where: { title: course.title } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.semester).toBe(course.semester);
    expect(dbUser!.title).toBe(course.title);
    expect(dbUser!.user).toBe(course.user);
    expect(dbUser!.year).toBe(course.year);
  });
});