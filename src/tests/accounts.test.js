const app = require("../../app");
const supertest = require("supertest");
const { User, Wallet, Cart } = require("../models/index");

const user = {
  firstname: "test",
  lastname: "ford",
  password_confirm: "password",
  password: "password",
  role_id: 4,
  phone_number: "+2349060579834",
  email: "testford@gmail.com"
};

describe("POST api/auth/signup/email", () => {
  let endpoint = "/api/auth/signup/email";

  beforeAll(() => {
    request = supertest(app);
  });

  afterAll(() => {});

  afterEach(async () => {
    // wallet and cart is automatically dropped because it is cascaded
    let user = await User.findOne({ where: { email: "testford@gmail.com" } });
    if (user) return user.destroy();
  });

  describe("given the right data format should create a new user", () => {
    // should return a status code of 201
    // should have a role_id, email, firstname and lastname
    // should have a wallet associated with user
    // should have a cart associated with user
    it("should test user creation", async () => {
      const response = await request.post(endpoint).send(user);
      const user_id = response.body.data.id;
      const associated_wallet = await Wallet.findOne({
        where: { user_id }
      });
      const associated_cart = await Cart.findOne({
        where: { user_id }
      });
      expect(response.status).toBe(201);
      expect(response.body.data.role_data.id).toBeDefined();
      expect(response.body.data.role_data.id).toBe(4);
      expect(response.body.data.firstname).toBe("test");
      expect(response.body.status).toBeTruthy();
      
      expect(associated_wallet.dataValues.user_id).toBeDefined();
      expect(associated_wallet.dataValues.user_id).toBe(user_id);

      expect(associated_cart.dataValues.user_id).toBeDefined();
      expect(associated_cart.dataValues.user_id).toBe(user_id);
    });
  });

  describe("given the right wrong data format should", () => {
    // should return a status code of 400
    // should return a json object
    // should expect errorData to be defined as an Array of errors
    // should have a status of false
    // it("", async () => {})
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
