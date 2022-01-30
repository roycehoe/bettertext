import express from "express";
import { createSocketServer, setupSocketServer } from "./socket";


var router = require('./router')
var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router)

<<<<<<< HEAD

const httpServer = createServer(app);
httpServer.listen(80);

const io = new Server(httpServer, { cors: { origin: "*" } });


io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});


io.on("connection", (socket) => {
  console.log("connected")
  socket.on("message", (data) => { //listen for message event
    io.emit('message', data) //emit message to everyone
  })
})
=======
const io = createSocketServer(app)
setupSocketServer(io)
>>>>>>> to-merge
