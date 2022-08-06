const express = require("express");
const router = express.Router();
const Chat = require("../../models/chatModel");

// fetch chats api
router.get("/", async (req, res) => {
	// users id
	const userId = req.query.user;

	// error if user id is empty
	if (!userId) {
		res.status(406).json({ error: true, message: "Body not found." });
		res.end();
		return;
	}

	try {
		// fetch all chats with this user id
		const fetchChats = await Chat.find({
			members: { $elemMatch: { $eq: userId } },
		})
			.populate("members", "-password")
			.populate("latestMessage");

		// send reponse
		res.status(200).json({
			success: true,
			message: "Fetched all chats",
			result: fetchChats,
		});

		res.end();
		return;
	} catch (error) {
		res.status(400).json({
			error,
			message: "Fetching chats unsuccessful",
		});
		res.end();
		return;
	}
});

// export
module.exports = router;
