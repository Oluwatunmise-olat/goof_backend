const router = require("express").Router();
const { checkSchema } = require("express-validator");

const controller = require("../controllers/vendor.controller.js");
const schemas = require("../schema/vendor.schema");
const IsAuth = require("../middleware/auth.middleware");
