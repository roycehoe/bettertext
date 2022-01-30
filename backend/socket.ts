import { createServer } from "http";
import { Server } from "socket.io";
import * as core from 'express-serve-static-core'

export function createSocketServer(app: core.Express): Server {
    const httpServer = createServer(app);
    httpServer.listen(8000);
    return new Server(httpServer, { cors: { origin: "*" } })
}

export function setupSocketServer(io: Server) {
    // io.on("connection", (socket) => {
    //     console.log("connected")
    io.sockets.on('connection', (socket) => {
        // once a client has connected, we expect to get a ping from them saying what room they want to join
        socket.on('room', (room) => {
            socket.join(room);
            console.log("A user has joined the following room: ", room)
        });
        socket.on("message", (room, data) => { //listen for message event
            // io.emit('message', data) //emit message to everyone
            io.sockets.in(room).emit('message', data)
        })
    });

    io.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
}