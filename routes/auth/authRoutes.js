const express = require("express");
const router = express.Router();

// all auth routes
// create account route
const createAccountRoute = require("./createAccount");
router.use("/create", createAccountRoute);

// export router
module.exports = router;
