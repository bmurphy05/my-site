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
mutation addCourse($data: CourseInput!) {
  course(
    data: $data
  ) {
    id
    title
    semester
    year
    user
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

    console.log(JSON.stringify(response));
    /*
    expect(response).toMatchObject({
      data: {
        course: {
          title: course.title,
          semester: course.semester,
          year: course.year,
          user: course.user
        }
      }
    });
    */

    const dbCourse = await Course.findOne({ where: { title: course.title } });
    expect(dbCourse).toBeDefined();
    expect(dbCourse!.title).toBe(course.title);
    expect(dbCourse!.semester).toBe(course.semester);
    expect(dbCourse!.year).toBe(course.year);
    expect(dbCourse!.user).toBe(course.user);
  });
});