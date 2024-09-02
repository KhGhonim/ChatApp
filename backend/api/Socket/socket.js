// api/socket/socket.js
import { Server } from "socket.io";
import ConsversationsModel from "../Models/conversation.model.js";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.DEV_URL,  // Allow CORS for your frontend URL
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  // Handle socket connections
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    

    // Listen for joinConversation event
    socket.on("joinConversation", ({ currentUserId, userId }) => {
      socket.join(userId);
      console.log(`User ${currentUserId} joined conversation with user ${userId}`)
    });

    // Listen for leaveConversation event
    socket.on("leaveConversation", ({ currentUserId, userId }) => {
      console.log(`User ${currentUserId} left conversation with user ${userId}`)
    });



    // Add event listeners here
    socket.on("message", async (data) => {
      let conversationId = await ConsversationsModel.findOne({
        participants: { $all: [data.currentUserId, data.userId] },
      });
      if (data.userId) {
      

        if (conversationId) {
          io.to(conversationId._id).emit("Sendmessage", data.message);
          console.log("Message sent to user:", data.userId);
        } else {
          console.error('Conversation not found.');
        }
      } else {
        console.log('User ID is not defined or user is not connected.');
      }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default initializeSocket;
