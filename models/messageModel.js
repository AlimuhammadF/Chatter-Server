const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
	{
		sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		message: { type: String, trim: true },
		chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
		seen: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
