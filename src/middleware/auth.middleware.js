const { extractAuth: extractHeader } = require("../utils/headers");
const response = require("../utils/response");
const { verifyAccessToken, checkToken } = require("../service/jwt.service");

module.exports = async (req, res, next) => {
  const [status, resp] = extractHeader(req.headers);

  if (!status)
    return res.status(401).json(
      response({
        status: false,
        errorData: [{ msg: "No Authorization Token" }],
        code: 103
      })
    );

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
    const [status, value] = await verifyAccessToken(token);
    if (!status)
      return res
        .status(401)
        .json(response({ status: false, errorData: [{ msg: value }] }));

    const isBlacklisted = await checkToken(token);
    if (isBlacklisted)
      return res
        .status(401)
        .json(
          response({ status: false, errorData: [{ msg: "Invalid Token" }] })
        );

    const { user_id, role_id, role_name } = value;
    req.userID = user_id;
    req.roleID = role_id;
    req.roleName = role_name;

    return next();
  } catch (error) {
    // log error
  }
};
