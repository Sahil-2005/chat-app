import dotenv from 'dotenv';
import express from 'express';
import authRoutes from "./routes/auth-route.js";

import path from 'path'
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import { app, server } from './lib/socket.js';


dotenv.config()
// const app = express();


const PORT = process.env.PORT;
const __dirname = path.resolve();

// app.use(express.json());
app.use(express.json( {limit: '10mb'} ));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'https://chat-app-1-uxbk.onrender.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}))


app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));


  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}




server.listen(PORT, () => {
    console.log('listening on port: '+PORT)
    connectDB();
})

