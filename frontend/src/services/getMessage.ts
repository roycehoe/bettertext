import { Ok, Err, Result } from "ts-results"
import { client } from "."


export interface GetMessageResponse {
    _id: string
    username: string
    message: string
    createdAt: number
}


export async function getMessage(): Promise<Result<Array<GetMessageResponse>, string>> {
    try {
        const response = await client.get("/");
        return Ok(response.data as Array<GetMessageResponse>)
    }
    catch (error) {
        console.log(error)
        return Err("error in getMessage occured") //to implement proper error handling
    }
}