import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

var router = require('./router')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router)

const httpServer = createServer(app);
httpServer.listen(8000);

const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("message", (data) => { //listen for message event
    io.emit('message', data) //emit message to everyone
  })
})