import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/message.model.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

const userSocketMap = {}; // {userId: socketId}

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId !== "undefined") userSocketMap[userId] = socket.id;

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("sendMessage", async (messageData) => {
		const { senderId, receiverId, message } = messageData;
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
			createdAt: new Date(),
		});

		try {
			await newMessage.save();
			const receiverSocketId = userSocketMap[receiverId];
			if (receiverSocketId) {
				io.to(receiverSocketId).emit("receiveMessage", message);
			}
			io.emit("messageSaved", newMessage); // Emit an event to notify that the message is saved
		} catch (error) {
			console.error("Error saving message to MongoDB:", error);
		}
	});

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server, getReceiverSocketId };
