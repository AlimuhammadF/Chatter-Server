const express = require("express");
const router = express.Router();

// all routers
// create chat api
const createChatApi = require("./createChat");
router.use("/createChat", createChatApi);

// export
module.exports = router;
