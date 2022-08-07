const express = require("express");
const { default: mongoose } = require("mongoose");
const Chat = require("../../models/chatModel");
const Message = require("../../models/messageModel");
const router = express.Router();

// send message api
router.post("/", async (req, res) => {
	// destruture body
	const { chatId, message, sender } = req.body;

	// throw error if no boyd found
	if (!chatId || !message || !sender) {
		res.status(406).json({ error: true, message: "Body not found." });
		return;
	}

	// create message document
	try {
		const handlesendMessage = new Message({
			chatId,
			message,
			sender,
		});
		const sendMessage = await handlesendMessage.save();

		// update latest Message on chat id
		await Chat.updateOne(
			{ _id: chatId },
			{ latestMessage: sendMessage._id }
		);

		res.status(201).json({
			success: true,
			message: "Message Sent.",
			result: sendMessage,
		});

		return;
	} catch (error) {
		res.status(400).json({ error, message: "Something went wrong." });
		return;
	}
});

// export
module.exports = router;
