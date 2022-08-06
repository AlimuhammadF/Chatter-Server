const express = require("express");
const Chat = require("../../models/chatModel");
const router = express.Router();

// create chat api
router.post("/", async (req, res) => {
	// destructure bodu
	const { receiverId, senderId } = req.body;

	// throw if no id found
	if (!receiverId || !senderId) {
		res.status(406).json({ error: true, message: "Body not found." });
		res.end();
		return;
	}

	// check if personal chat exist with this user id
	try {
		const isChatExist = await Chat.findOne({
			isGroupChat: false,
			$and: [
				{ members: { $elemMatch: { $eq: senderId } } },
				{ members: { $elemMatch: { $eq: receiverId } } },
			],
		})
			.populate("members", "-password")
			.populate("latestMessage");

		// if chat exit with this user id
		if (isChatExist) {
			res.status(200).json({
				success: true,
				message: "Chat already exist with the user.",
				result: isChatExist,
			});
			res.end();
			return;
		}

		// chat data
		const chatData = {
			members: [receiverId, senderId],
		};

		// if not exist create chat wuth this userid
		const createChat = await (
			await (await Chat.create(chatData)).populate("members", "-password")
		).populate("latestMessage");

		res.status(201).json({
			success: true,
			message: "Chat has been created.",
			createChat,
		});

		res.end();
	} catch (error) {
		// if error
		res.status(400).json({ error, message: "Creating chat unsuccessful" });
		res.end();
	}
});

// export
module.exports = router;
