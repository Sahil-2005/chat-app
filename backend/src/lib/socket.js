// import { Server } from "socket.io";
// import http from 'http';
// import express from 'express';

// const app = express();
// const server = http.createServer(app);


// const io = new Server(server, {
//     cors: {
//         // origin: ['http://localhost:5173']
//         origin: ['http://localhost:5173','https://chat-app-kohl-zeta.vercel.app']
//     }
// })

// const userSocketMap = {}


// export function getReceiverSocketId(userId) {
//     return userSocketMap[userId];
// }

// io.on("connection", (socket) => {
//     console.log("A user connected", socket.id);

//     const userId = socket.handshake.query.userId;

//     if(userId) userSocketMap[userId] = socket.id;


//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
    

//     socket.on("disconnect", () => {
//         console.log("A user disconnected", socket.id);

//         delete userSocketMap[userId]
//         io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     })
// })



// export {io, app, server}


import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
app.set("trust proxy", 1);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chat-app-kohl-zeta.vercel.app"
    ],
    credentials: true,
  },
});

const userSocketMap = {};

// socket auth middleware
io.use((socket, next) => {
  const userId = socket.handshake.query.userId;

  if (!userId) {
    return next(new Error("Unauthorized socket"));
  }

  socket.userId = userId;
  next();
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
