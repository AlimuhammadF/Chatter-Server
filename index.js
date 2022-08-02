require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// create http server
const app = express();
const server = http.createServer(app);

// middleware
app.use(cors());
app.use(express.json());

// create socket server
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

// routees
app.get("/", (req, res) => {
	res.send("Hello World");
});

// Listening
const port = 8080 || process.env.PORT;
server.listen(port, () => console.log(`Listening port:${port}`));
