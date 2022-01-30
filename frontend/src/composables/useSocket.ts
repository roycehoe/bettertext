import { io, Socket } from "socket.io-client";
import { MessageDisplay } from "./useMessage";

const SOCKET_URI = "http://localhost:8000"
const messageSocket = io(SOCKET_URI)

export function useSocket() {

    function joinSocketRoom(username: string, roomName: string): void {
        messageSocket.on('connect', () => {
            messageSocket.emit('room', username, roomName)
                ;
        });
    }

    function logMessageHistory(log: Array<MessageDisplay>): void {
        messageSocket.on('message', (data) => {
            console.log(data)
            log.push(data)
        })
    }

    function emitMessageToRoom(room: string, message: MessageDisplay) {
        messageSocket.emit('message', room, message)
    }

    return { joinSocketRoom, logMessageHistory, emitMessageToRoom }
} 