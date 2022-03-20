const jwt = require("jsonwebtoken");
const redis = require("redis");
const config = require("config");
const { port, host, url } = config.get("redis");
const client = redis.createClient({ url });

const SECRET_KEY = process.env.SERVER_SECRET_KEY;

exports.genAccessToken = async (payload) => {
  const token = await jwt.sign({ ...payload }, SECRET_KEY, {
    expiresIn: "1d"
  });
  return token;
};

exports.verifyAccessToken = async (token) => {
  try {
    const payload = await jwt.verify(token, SECRET_KEY);
    return [true, payload];
  } catch (error) {
    if (error.name == "TokenExpiredError") return [false, "Token Expired"];
    if (error.name == "JsonWebTokenError") return [false, "Token Tamperred"];

    // log error
  }
};

(async function () {
  client.on("connect", (err) => {
    console.log("Client connected to Redis...");
  });
  client.on("ready", (err) => {
    console.log("Redis ready to use");
  });
  client.on("error", (err) => {
    console.error("Redis Client", err);
  });
  client.on("end", () => {
    console.log("Redis disconnected successfully");
  });
  await client.connect();
})();

exports.checkToken = async (token) => {
  try {
    const status = await client.sIsMember("tokenBlacklist", token);
    return status;
  } catch (e) {
    // log error
  }
};

exports.blacklistToken = async (token) => {
  try {
    const addToken = await client.sAdd("tokenBlacklist", token);
    return;
  } catch (e) {
    // log error
  }
};
