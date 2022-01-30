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
    io.sockets.on('connection', function (socket) {
        // once a client has connected, we expect to get a ping from them saying what room they want to join
        socket.on('room', function (room) {
            socket.join(room);
        });
        socket.on("message", (data) => { //listen for message event
            io.emit('message', data) //emit message to everyone
        })
    });

    io.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
}