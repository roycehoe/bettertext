import { Ok, Err, Result } from "ts-results"
import { client } from "."


export interface MessageResponse {
    _id: string
    username: string
    message: string
    createdAt: number
    chatroom: string
}


export async function getAllMessageRequest(chatroom: string): Promise<Result<Array<MessageResponse>, string>> {
    try {
        const response = await client.get(`/${chatroom}`);
        return Ok(response.data as Array<MessageResponse>)
    }
    catch (error) {
        console.log(error)
        return Err("error in getMessage occured") //to implement proper error handling
    }
}