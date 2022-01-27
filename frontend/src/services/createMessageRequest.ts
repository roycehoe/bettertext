import { Ok, Err, Result } from "ts-results"
import { client } from "."
import { MessageResponse } from "./getAllMessageRequest";


export interface CreateMessageRequest {
    username: string
    message: string
    chatroom: string
}

export interface CreateMessageResponse extends MessageResponse {
}


export async function createMessageRequest(message: CreateMessageRequest): Promise<Result<CreateMessageResponse, string>> {
    try {
        const response = await client.post("/", message);
        return Ok(response.data as CreateMessageResponse)
    }
    catch (error) {
        console.log(error)
        return Err("error in sendMessageRequest occured") //to implement proper error handling
    }
}