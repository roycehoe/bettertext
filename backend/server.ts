import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { create, get, SetTextDataRequest } from "../backend/database";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);
httpServer.listen(8000, () => {
  console.log('server runing')
});

app.get('/', async (req: any, res) => {
  const data = await get()
  res.json(data)
})

app.post('/', async (req: any, res) => {
  const postData = {
    username: req.body.username,
    message: req.body.message,
    createdAt: Date.now()
  } as SetTextDataRequest

  await create(postData)
  res.json(postData)
})

const io = new Server(httpServer, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit('message', data)
  })
})