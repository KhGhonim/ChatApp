import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  },
})


io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)


  socket.on('join_room', (data) => {
    socket.join(data.room)
    console.log(`User with ID: ${socket.id} joined room: ${data.room}`)
  })

  socket.on('send_message', (data) => {
    io.to(data.reciverID).emit('receive_message', data)
  })

  socket.on('typing', (data) => socket.in(data.room).emit('typing', data))

  socket.on('stop_typing', (data) => socket.in(data.room).emit('stop_typing', data))

  socket.on('leave_room', (data) => {
    socket.leave(data.room)
    console.log(`User with ID: ${socket.id} left room: ${data.room}`)
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id)
  })
})

export { app, io, server };