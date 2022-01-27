<script setup lang="ts">
import { io } from "socket.io-client"
import { onBeforeMount, ref } from "vue";
import { isJoinedChat, MessageDisplay, messageForm, messageHistory, SubmitMessageForm, useMessage } from "../composables/useMessage";


const { createMessageResponse, getAllMessage, createMessage } = useMessage()
const messageSessionHistory = ref([] as Array<MessageDisplay>)

const socket = io("http://localhost:8000")

async function sendMessage(messageForm: SubmitMessageForm) {
    await createMessage(messageForm)
    socket.emit('message', createMessageResponse.value)
}

async function setupMessageSocket() {
    socket.on('message', (data) => {
        messageSessionHistory.value.push(data)
    })
}


onBeforeMount(() => { setupMessageSocket() })

</script>

<template>
    <div v-if="isJoinedChat">
        <form @submit.prevent="sendMessage(messageForm)">
            <input type="text" v-model="messageForm.username" />
            <input type="text" v-model="messageForm.message" />
            <button>Send message</button>
        </form>
        <p>message form: {{ messageForm }}</p>
        <p>Broadcasted message: {{ messageSessionHistory }}</p>
        <p>Message database: {{ messageHistory }}</p>
    </div>
</template>

<style>
</style>
