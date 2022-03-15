const app = require("../../app");
const supertest = require("supertest");

beforeEach(() => {
  request = supertest(app);
});

describe("POST api/auth/signup/email", () => {
  describe("given the right data format should create a new user", () => {
    // should return a status code of 201
    // should have a role_id, email, firstname and lastname
    // should have a wallet associated with user
    // should have a cart associated with user
  });

  describe("given the right wrong data format should", () => {
    // should return a status code of 400
    // should return a json object
    // should expect errorData to be defined as an Array of errors
    // should have a status of false
  });
});

describe("POST api/auth/login", () => {
  let endpoint = "/api/auth/login/email";

  // afterAll(() => {
  //   request.close();
  // });

  describe("given a valid username and password", () => {
    // should return user data including access token
    // should return a json response
    // status code should be 200
    // expect data to be defined
    it("should respond with status code 200", async () => {
      const response = await request.post(endpoint).send({
        email: "oolat31@gmail.com",
        password: "test"
      });
      expect(response.status).toBe(200);
    });
  });

  describe("given an invalid username and password", () => {
    // should return 400 status code
    // should return a json response
    // response should contain errorData which is an Array
    it("should return 400 status code", async () => {
      const response = await request.post(endpoint).send({
        email: "test@example.com",
        password: "password"
      });
      expect(response.status).toBe(404);
      expect(response.body.errorData).toBeDefined();
    });
  });
});
