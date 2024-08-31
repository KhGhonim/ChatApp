import cors from 'cors'
import express from "express";
import MongoDB from "./api/DB/MongoDB.js";
import authRoutes from "./api/Routes/auth.route.js";
import messageRoutes from "./api/Routes/messages.route.js";
import userRoutes from "./api/Routes/user.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { setupSocketIO } from './Socekt.io//Socket.io.js'; // Import the setup function
import http from 'http';

dotenv.config();
const port = 5000
const app = express();

// Use CORS middleware for Express routes
app.use(cors({
  origin: process.env.BASE_URL,
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
}));


app.use(express.json())
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello to KG Live Chat App!')
})

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Create the HTTP server using the Express app
const server = http.createServer(app);

// Set up Socket.io
setupSocketIO(server); // Pass the server to the setup function

const startServer = async () => {
  await MongoDB();
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();


