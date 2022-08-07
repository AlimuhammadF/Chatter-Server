require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDb = require("./utils/connectDb");

// create http server
const app = express();
const server = http.createServer(app);

// connect database
connectDb();

// middleware
app.use(cors());
app.use(express.json());

// create socket server
const io = new Server(server, {
	pingTimeout: 60000,
	cors: {
		origin: "*",
	},
});

// socket connection
io.on("connection", (socket) => {
	// setup personal room
	socket.on("setup", async (data) => {
		await socket.join(data.userId);
		console.log(`Setup complete for this userid: ${data.userId}`);
	});

	// join chat
	socket.on("join-room", async (room) => {
		await socket.join(room);
		console.log(`Joined Chat ${room}`);
	});

	// leave room
	socket.on("leave-room", async (room) => {
		await socket.leave(room);
		console.log(`Room Left: ${room}`);
	});

	// send message
	socket.on("send-message", (data) => {
		socket.to(data.chatId).emit("rec-message", data);
	});

	// seen message
	socket.on("seen-message-send", (data) => {
		socket.to(data.chatId).emit("seen-message-rec", data);
	});

	// fetch chat indication
	socket.on("fetch-chat-indication", (data) => {
		socket.to(data.roomId).emit("fetch-chat-indication-rec", data);
	});

	// typing animation
	socket.on("typing-send", (data) => {
		socket.to(data.chatId).emit("typing-rec", data);
	});

	socket.on("disconnect", () => {
		console.log(`Disconneted: ${socket.id}`);
	});
});

// routees
// default route
app.get("/", (req, res) => {
	res.send("Hello World");
});

// auth route
const authRoutes = require("./routes/auth/authRoutes");
app.use("/api/v1/auth", authRoutes);

// chat route
const chatRoutes = require("./routes/chat/allChatRouter");
app.use("/api/v1/chat", chatRoutes);

// Listening
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening port:${port}`));
