import { io } from "socket.io-client"


export function getSocket() {
    return io()
}