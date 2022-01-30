import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { getMessage } from "./database";
import * as core from 'express-serve-static-core'


var router = require('./router')
var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router)


function createSocketServer(app: core.Express) {
  const httpServer = createServer(app);
  httpServer.listen(8000);
  const io = new Server(httpServer, { cors: { origin: "*" } })

  io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });


  io.on("connection", (socket) => {
    console.log("connected")


    socket.on("message", (data) => { //listen for message event
      io.emit('message', data) //emit message to everyone
    })
  })
}

createSocketServer(app)