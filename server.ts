import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { get } from "./database";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const recordRoutes = express.Router()

app.get('/', async (req: any, res) => {
  const data = await get()
  res.json(data)
})


// app.get('/', (req: any, res) => {
//   res.send("hello")
// })

// io.on("connection", (socket: any) => {
//   // ...
// });

httpServer.listen(3000, () => {
  console.log('server runing')
});