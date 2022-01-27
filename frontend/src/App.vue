<script setup lang="ts">
import { io } from "socket.io-client"
import { onBeforeMount, ref } from "vue";
import { useMessage } from "./composables/useMessage";

const { messageHistory, getAllMessage, createMessage } = useMessage()

const messageLatest = ref()
const messageForm = ref({} as SubmitMessageForm)
const socket = io("http://localhost:8000")

interface SubmitMessageForm {
  username: string
  message: string
}

function broadcastMessage() { //refactor to broadcast message
  socket.on('message', (data) => {
    messageLatest.value = data
  })
  socket.emit('message', messageForm.value)
}


function sendMessage() {
  broadcastMessage()
  //save message to database here
}


onBeforeMount(() => getAllMessage())

</script>

<template>
  <form @submit.prevent="sendMessage">
    <input type="text" v-model="messageForm.username" />
    <input type="text" v-model="messageForm.message" />
    <button>Send message</button>
  </form>
  <p>message form: {{ messageForm }}</p>
  <p>Latest emitted message: {{ messageLatest }}</p>
  <p>Message database: {{ messageHistory }}</p>
</template>

<style>
</style>
