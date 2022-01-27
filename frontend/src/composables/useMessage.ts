import { ref } from "vue";
import { CreateMessageRequest, createMessageRequest } from "../services/createMessageRequest";
import { getAllMessageRequest, MessageResponse } from "../services/getAllMessageRequest";

export function useMessage() {

    const messageHistory = ref({} as Array<MessageResponse>)

    async function getAllMessage(): Promise<void> {
        const { ok: isSuccessful, val: response } = await getAllMessageRequest()
        if (isSuccessful) {
            messageHistory.value = response as Array<MessageResponse>
            return
        }
        console.log(response)
    }


    async function createMessage(createMessageForm: CreateMessageRequest): Promise<void> {
        const { ok: isSuccessful, val: response } = await createMessageRequest(createMessageForm)
        if (isSuccessful) {
            return
        }
        console.log(response)
    }

    return { messageHistory, getAllMessage, createMessage }


}
