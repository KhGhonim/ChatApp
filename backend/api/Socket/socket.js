import { Server } from "socket.io";
let io;
const userSocketMap = {};

// Function to get the receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.DEV_URL,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
      userSocketMap[userId] = socket.id;
      socket.join(userId);
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // Remove user from userSocketMap on disconnect so to be able to re-connect
      Object.keys(userSocketMap).forEach(userId => {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
        }
      });
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });

  return io;
};
// Export the io instance so it can be used in other files
export { io };
