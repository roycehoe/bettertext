import { ref } from "vue";
import { CreateMessageRequest, createMessageRequest, CreateMessageResponse } from "../services/createMessageRequest";
import { getAllMessageRequest, MessageResponse } from "../services/getAllMessageRequest";
import { getDateTime, MessageTime } from "../services/getDateTime";


export interface MessageDisplay {
    id: string
    username: string
    message: string
    time: MessageTime
}


export function useMessage() {

    const createMessageResponse = ref({} as CreateMessageResponse)
    const messageHistory = ref({} as Array<MessageDisplay>)

    function _createMessageArray(allMessageResponse: Array<MessageResponse>): Array<MessageDisplay> {
        const messageArray = [] as Array<MessageDisplay>

        allMessageResponse.forEach(message => {
            messageArray.push({
                id: message._id,
                username: message.username,
                message: message.message,
                time: getDateTime(message.createdAt)
            })
        })
        return messageArray
    }

    function _createMessageResponse(messageResponse: MessageResponse): MessageDisplay {
        return ({
            id: messageResponse._id,
            username: messageResponse.username,
            message: messageResponse.message,
            time: getDateTime(messageResponse.createdAt)
        })
    }

    async function getAllMessage(): Promise<void> {
        const { ok: isSuccessful, val: response } = await getAllMessageRequest()
        if (isSuccessful) {
            messageHistory.value = _createMessageArray(response as Array<MessageResponse>)
            return
        }
        console.log(response)
    }


    async function createMessage(createMessageForm: CreateMessageRequest): Promise<void> {
        const { ok: isSuccessful, val: response } = await createMessageRequest(createMessageForm)
        if (isSuccessful) {
            createMessageResponse.value = response as CreateMessageResponse
            return
        }
        console.log(response)
    }

    return { messageHistory, createMessageResponse, getAllMessage, createMessage }


}