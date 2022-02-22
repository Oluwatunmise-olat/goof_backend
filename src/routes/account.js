const router = require("exprss").Router();

const controller = require("../controllers/account");

router.post("/signup", controller.signupHandler);

module.exports = router;
