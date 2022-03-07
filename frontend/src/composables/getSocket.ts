import { io } from "socket.io-client"
import { BASEURL } from "../services"

export function getSocket() {
    return io(BASEURL)
}