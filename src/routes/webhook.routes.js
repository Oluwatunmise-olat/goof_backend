const router = require("express").Router();

const controller = require("../controllers/account.controller");

router.get("/google", controller.googleHook);

module.exports = router;
