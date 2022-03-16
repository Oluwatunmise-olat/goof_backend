const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SERVER_SECRET_KEY;

exports.genAccessToken = async (payload) => {
  const token = await jwt.sign({ ...payload }, SECRET_KEY, {
    expiresIn: "7d"
  });
  return token;
};

exports.verifyAccessToken = async (token) => {
  return await jwt.verify(token, SECRET_KEY);
};
