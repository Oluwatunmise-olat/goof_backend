const router = require("express").Router();

const controller = require("../controllers/account");

router.get("/signup", controller.signupHandler);

module.exports = router;
