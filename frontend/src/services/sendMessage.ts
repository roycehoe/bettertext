import { Ok, Err, Result } from "ts-results"
import { client } from "."
import { GetMessageResponse } from "./getMessage";


export interface SendMessageRequest {
    username: string
    message: string
}

interface SendMessageResponse extends GetMessageResponse {
}


export async function sendMessage(message: SendMessageRequest): Promise<Result<Array<SendMessageResponse>, string>> {
    try {
        const response = await client.post("/");
        return Ok(response.data as Array<GetMessageResponse>)
    }
    catch (error) {
        console.log(error)
        return Err("error in sendMessage occured") //to implement proper error handling
    }
}