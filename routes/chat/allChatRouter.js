const express = require("express");
const router = express.Router();

// all routers
// create chat api
const createChatApi = require("./createChat");
router.use("/createChat", createChatApi);

// fetch chats api
const fetchChatApi = require("./fetchChats");
router.use("/fetchChats", fetchChatApi);

// send message api
const sendMessageApi = require("./sendMessage");
router.use("/sendMessage", sendMessageApi);

// fetch all messages
const fetchMessageApi = require("./fetchMessages");
router.use("/fetchMessages", fetchMessageApi);

// send message api
const seenMessageApi = require("./seenMessage");
router.use("/seenMessage", seenMessageApi);

// export
module.exports = router;
