const dotenv = require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// create http server
const app = express();
const server = http.createServer(app);

// create socket server
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});
