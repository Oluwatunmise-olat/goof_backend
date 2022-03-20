const extractHeader = require("../utils/headers");
const response = require("../utils/response");
const { verifyAccessToken, checkToken } = require("../service/jwt.service");

module.exports = async (req, res, next) => {
  const resp = extractHeader(req.headers);

  // check if it's has a label of bearer token
  if (!resp[0] == "Bearer")
    return res.status(401).json(
      response({
        status: false,
        errorData: [{ msg: "Invalid Token Label" }],
        code: 102
      })
    );

  const token = resp[1];

  try {
    // verify the token hasn't expired and handles case of expired or tamperred token
    const [status, value] = await verifyAccessToken(token);
    if (!status)
      return res
        .status(401)
        .json(response({ status: false, errorData: [{ msg: value }] }));

    // verify the token is not blacklisted
    const isBlacklisted = await checkToken(token);
    if (isBlacklisted)
      return res
        .status(401)
        .json(
          response({ status: false, errorData: [{ msg: "Invalid Token" }] })
        );
    // extract user from token
    const { user_id, role_id } = value;
    req.userID = user_id;
    req.roleID = role_id;

    return next();
  } catch (error) {
    // log error
  }
};
