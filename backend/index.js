import cors from 'cors'
import { app, server } from './socket.io/socket.io.js'
import express from "express";
import MongoDB from "./api/DB/MongoDB.js";
import authRoutes from "./api/Routes/auth.route.js";
import messageRoutes from "./api/Routes/messages.route.js";
import userRoutes from "./api/Routes/user.route.js";
import cookieParser from "cookie-parser";



const port = 5000
app.use(express.json())
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", methods: ['GET', 'POST'], credentials: true }));
app.get('/', (req, res) => {
  res.send('Hello to KG Live Chat App!')
})

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

const startServer = async () => {
  await MongoDB();
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();