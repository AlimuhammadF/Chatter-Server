const express = require("express");
const Message = require("../../models/messageModel");
const router = express.Router();

// read messaeg api
router.post("/", async (req, res) => {
	// destructure body
	const { seen, messageId } = req.body;

	// throw error if body not found
	if (!messageId || !seen) {
		res.status(406).json({ error: true, message: "Body not found." });
		return;
	}

	// update message
	try {
		await Message.updateOne({ _id: messageId }, { seen });
		res.status(204).json({ success: true, message: "Content updated." });
	} catch (error) {
		res.status(400).json({ error, message: "Something went wrong." });
		return;
	}
});

// export
module.exports = router;
