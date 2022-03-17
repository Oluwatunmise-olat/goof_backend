const app = require("../../app");
const supertest = require("supertest");
const models = require("../models/index");
const { user1, user2 } = require("./data/users.data");

describe("POST api/auth/signup/email", () => {
  let endpoint = "/api/auth/signup/email";

  beforeAll(() => {
    request = supertest(app);
  });

  afterAll(() => {});

  afterEach(async () => {
    // wallet and cart is automatically dropped because it is cascaded
    let user = await models.User.findOne({ where: { email: user1.email } });
    if (user) return user.destroy();
  });

  describe("given the right data format should create a new user", () => {
    // should return a status code of 201
    // should have a role_id, email, firstname and lastname
    // should have a wallet associated with user
    // should have a cart associated with user
    it("should test user creation", async () => {
      const response = await request.post(endpoint).send(user1);
      const user_id = response.body.data.id;
      const { data, status } = response.body;
      const associated_wallet = await models.Wallet.findOne({
        where: { user_id }
      });
      const associated_cart = await models.Cart.findOne({
        where: { user_id }
      });
      expect(response.status).toBe(201);
      expect(data.role_data.id).toBeDefined();
      expect(data.role_data.id).toBe(4);
      expect(data.firstname).toBe(user1.firstname);
      expect(status).toBeTruthy();

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
    // should not create a user
    it("should fail return json object describing errors", async () => {
      // we don't send the email field here
      const response = await request.post(endpoint).send(user2);
      const { errorData, status } = response.body;
      expect(response.status).toBe(400);
      expect(errorData).toBeDefined();
      expect(status).toBeFalsy();
      expect(errorData.length >= 1).toBeTruthy();
    });
  });
});

describe("POST api/auth/login", () => {
  let endpoint = "/api/auth/login/email";

  beforeAll(() => {
    request = supertest(app);
  });

  beforeEach(async () => {
    // create user and hash password
    const data = {
      ...user1,
      avatar: "",
      phone_number: user1.phone_number.split("+")[1]
    };

    delete data.password_confirm;

    const password_hash = await models.User.makePassword(user1.password);
    await models.User.create({
      ...data,
      password: password_hash
    });
  });

  afterEach(async () => {
    // destroy user
    const user = await models.User.findOne({ where: { email: user1.email } });
    if (user) user.destroy();
  });

  afterAll(() => {});

  describe("given a valid username and password", () => {
    // should return user data including access token
    // should return a json response
    // status code should be 200
    // expect data to be defined
    // should not return password
    it("should respond with status code 200", async () => {
      const response = await request.post(endpoint).send({
        email: user1.email,
        password: user1.password
      });
      const { status, data } = response.body;
      expect(response.status).toBe(200);
      expect(status).toBeTruthy();
      expect(data).toBeDefined();
      expect(data.id).toBeDefined();
      expect(data.access_token).toBeDefined();
      expect(data.phone_number).toBe(user1.phone_number.split("+")[1]);
    });
  });

  describe("given an invalid username and password", () => {
    // should return 401 status code
    // should return a json response
    // response should contain errorData which is an Array
    it("should return 401 status code", async () => {
      const response = await request.post(endpoint).send({
        email: user1.email,
        password: user2.password
      });
      const { status, errorData, data } = response.body;
      expect(response.status).toBe(401);
      expect(errorData).toBeDefined();
      expect(errorData.length >= 1).toBeTruthy();
      expect(status).toBeFalsy();
      expect(data).toEqual({});
    });
  });
});

describe("POST api/auth/password/forgot", () => {
  describe("given a valid user eamil", () => {
    const endpoint = "/api/auth/password/forgot";

    beforeEach(async () => {
      // create user and hash password
      const data = {
        ...user1,
        avatar: "",
        phone_number: user1.phone_number.split("+")[1]
      };

      delete data.password_confirm;

      const password_hash = await models.User.makePassword(user1.password);
      await models.User.create({
        ...data,
        password: password_hash
      });
    });

    afterEach(async () => {
      // destroy user
      const user = await models.User.findOne({ where: { email: user1.email } });
      if (user) user.destroy();
    });

    it("should send a reset password link to a valid user email", async () => {
      // it should return a success msg
      // it should return a status of true
      // status code should be 200
      // an instance of rest_password table should be created
      // errorData should be undefined
      const response = await request
        .post(endpoint)
        .send({ email: user1.email });

      const restPasswordInstance = await models.Reset_Password.findOne({
        where: { email: user1.email }
      });

      const { data, msg, errorData, status } = response.body;

      expect(response.status).toBe(200);
      expect(data).toEqual({});
      expect(errorData).toEqual({});
      expect(msg).toBeDefined();
      expect(status).toBeTruthy();
      expect(restPasswordInstance.email).toEqual(user1.email);
    });

    it("should not send a reset password link given invalid email", async () => {
      // it should return a status code of 400
      // it should not create an instance of reste password
      // status should be falsy
      // errorData should be defined
      const response = await request
        .post(endpoint)
        .send({ email: user2.email });
      const { status, errorData, data } = response.body;

      const restPasswordInstance = await models.Reset_Password.findOne({
        email: user2.email
      });

      expect(response.status).toBe(400);
      expect(errorData).toBeDefined();
      expect(status).toBeFalsy();
      expect(restPasswordInstance.email).toBe(undefined);
    });
  });
});

describe("POST api/auth/password/reset", () => {
  describe("given user is logged in", () => {
    const endpoint = "/api/auth/password/reset";
  });
});
