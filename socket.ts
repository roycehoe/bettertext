import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.get('/home', (req: any, res) => {
  res.render('home')
})


io.on("connection", (socket: any) => {
  // ...
});

httpServer.listen(3000, () => {
  console.log('server runing')
});