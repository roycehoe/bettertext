import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { create, get, SetTextDataRequest } from "./database";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

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

httpServer.listen(3000, () => {
  console.log('server runing')
});

io.on("connectin", (socket) => { });