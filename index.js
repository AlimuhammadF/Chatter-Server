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
const port = 8080 || process.env.PORT;
server.listen(port, () => console.log(`Listening port:${port}`));
