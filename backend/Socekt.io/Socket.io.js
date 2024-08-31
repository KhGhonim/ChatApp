import { Server } from 'socket.io';

let io;

export function setupSocketIO(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.DEV_URL,
      methods: ['GET', 'POST', 'PUT'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log("User connected");
    
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io; // Optionally return io if needed
}

export { io }; // Export io for importing
