const app = require("../../app");
const supertest = require("supertest");

describe("POST api/auth/login", () => {
  let request;
  beforeAll(() => {
    request = supertest(app);
  });

  // afterAll(() => {
  //   request.close();
  // });

  describe("given a valid username and password", () => {
    // should return user data including access token
    // should return a json response
    // status code should be 200
    // expect data to be defined
    it("should respond with status code 200", async () => {
      const response = await request.post('/api/auth/login/email').send({
        email: "oolat31@gmail.com",
        password: "test"
      })
      console.log(response);
      expect(response.status).toBe(200);
    });
  });

  // describe("given an invalid username and password", async () => {
  //   // should return 400 status code
  //   // should return a json response
  //   // response should contain errorData which is an Array
  // });
});
