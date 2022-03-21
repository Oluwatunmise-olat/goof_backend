const router = require("express").Router();
const controller = require("../controllers/user.controller");
const IsAuth = require("../middleware/auth.middleware");

router.get("/profile", IsAuth, controller.getUserProfileHandler);

module.exports = router;
