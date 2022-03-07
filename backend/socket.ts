import { createServer } from "http";
import { Server } from "socket.io";
import * as core from 'express-serve-static-core'

export function createSocketServer(app: core.Express): Server {
    const httpServer = createServer(app);
    httpServer.listen(8000);
    return new Server(httpServer, { cors: { origin: "*" } })
}

export function setupSocketServer(io: Server) {
    io.sockets.on('connection', (socket) => {

        socket.on('room', (room, username) => {
            socket.join(room);
            console.log(username, "has joined the following room:", room)
        });

        socket.on("message", (room, data) => {
            console.log(data)
            io.sockets.in(room).emit('message', data)
        })

        socket.on("message", (room) => {
            io.sockets.in(room).emit('messagesent')
        })

        socket.on("message", (room) => {
            io.sockets.in(room).emit('messagesent')
        })
        socket.on('disconnect', (room) => {
            socket.leave(room);
        });
    });

    io.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
}