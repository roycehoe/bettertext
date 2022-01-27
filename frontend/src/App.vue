<script setup lang="ts">
import { io } from "socket.io-client"
import { ref } from "vue";

const message = ref()
const messageForm = ref({} as SubmitMessageForm)
const socket = io("http://localhost:8000")

interface SubmitMessageForm {
  username: string
  message: string
}



function sendMessage() {
  socket.on('message', (data) => {
    message.value = data
  })
  socket.emit('message', messageForm.value)
}

function getAllMessages() {

}


</script>

<template>
  <form @submit.prevent="sendMessage">
    <input type="text" v-model="messageForm.username" />
    <input type="text" v-model="messageForm.message" />
    <button>Send message</button>
  </form>
  <p>message form: {{ messageForm }}</p>
  <p>here are the messages: {{ message }}</p>
</template>

<style>
</style>
