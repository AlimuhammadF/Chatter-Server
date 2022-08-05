const express = require("express");
const router = express.Router();

// all auth routes
// create account api
const createAccountRoute = require("./createAccount");
router.use("/create", createAccountRoute);

// search user api
const searchUserRouter = require("./searchUser");
router.use("/searchUser", searchUserRouter);

// export router
module.exports = router;
