const express = require("express");
const Message = require("../../models/messageModel");
const router = express.Router();

// fetch all messages api
router.get("/", async (req, res) => {
	// get chat id from query
	const chatId = req.query.chatid;

	// throw error if no query found
	if (!chatId) {
		res.status(406).json({ error: true, messages: "Body no found." });
		return;
	}

	// fetch all messages
	try {
		const allMessages = await Message.find({ chatId: chatId })
			.populate("sender", "-password")
			.sort({ createdAt: 1 });

		// send response
		res.status(200).json({
			success: true,
			messages: "All messages fetched.",
			result: allMessages,
		});
		return;
	} catch (error) {
		res.status(400).json({ error, messages: "Something went wrong." });
		return;
	}
});

// export
module.exports = router;
