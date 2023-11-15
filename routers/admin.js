const express = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const router = express.Router();
adminController = require("../controllers/admin");
const authenticatedUser = require("../middlewares/authenticateUser");

router.use(authenticatedUser);

router.get("/", adminController.index)

module.exports = router;