import { Ok, Err, Result } from "ts-results"
import { client } from "."
import { MessageResponse } from "./getAllMessageRequest";


export interface CreateMessageRequest {
    username: string
    message: string
}

interface CreateMessageResponse extends CreateMessageRequest {
}


export async function createMessageRequest(message: CreateMessageRequest): Promise<Result<Array<CreateMessageResponse
>, string>> {
    try {
        const response = await client.post("/");
        return Ok(response.data as Array<MessageResponse>)
    }
    catch (error) {
        console.log(error)
        return Err("error in sendMessageRequest occured") //to implement proper error handling
    }
}