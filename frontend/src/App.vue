<script setup lang="ts">
import { io } from "socket.io-client"
import { onBeforeMount, ref } from "vue";
import { createMessageResponse, useMessage } from "./composables/useMessage";
import { createMessageRequest, CreateMessageRequest } from "./services/createMessageRequest";

const { messageHistory, getAllMessage, createMessage } = useMessage()
const messageSessionHistory = ref([] as Array<CreateMessageRequest>)
const messageForm = ref({} as SubmitMessageForm)

const socket = io("http://localhost:8000")

interface SubmitMessageForm extends CreateMessageRequest {
}

async function sendMessage(messageForm: SubmitMessageForm) {
  await createMessage(messageForm)
  socket.emit('message', createMessageResponse.value)
}

async function setupMessageSocket() {
  socket.on('message', (data) => {
    messageSessionHistory.value.push(data)
  })
}


onBeforeMount(() => { setupMessageSocket(); getAllMessage() })

</script>

<template>
  <p>Create Message Response: {{ createMessageResponse }}</p>
  <form @submit.prevent="sendMessage(messageForm)">
    <input type="text" v-model="messageForm.username" />
    <input type="text" v-model="messageForm.message" />
    <button>Send message</button>
  </form>
  <p>message form: {{ messageForm }}</p>
  <p>Broadcasted message: {{ messageSessionHistory }}</p>
  <p>Message database: {{ messageHistory }}</p>
</template>

<style>
</style>
