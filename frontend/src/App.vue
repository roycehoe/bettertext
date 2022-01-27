<script setup lang="ts">
import { io } from "socket.io-client"
import { onBeforeMount, ref } from "vue";

const messageLatest = ref()
const messageForm = ref({} as SubmitMessageForm)
const messageAll = ref({})
const socket = io("http://localhost:8000")

interface SubmitMessageForm {
  username: string
  message: string
}



function sendMessage() {
  socket.on('message', (data) => {
    // messageForm.value = data
    messageLatest.value = data
  })
  socket.emit('message', messageForm.value)
}

function getMessage() {
  socket.on('populateMessage', (data) => {
    messageLatest.value = data
  })
  socket.emit('message', messageLatest.value)
}

function test() {
  console.log("hello world")
}


onBeforeMount(() => getMessage())

</script>

<template>
  <form @submit.prevent="sendMessage">
    <input type="text" v-model="messageForm.username" />
    <input type="text" v-model="messageForm.message" />
    <button>Send message</button>
  </form>
  <p>message form: {{ messageForm }}</p>
  <p>Latest emitted message: {{ messageLatest }}</p>
  <p>Message database: {{ messageAll }}</p>
</template>

<style>
</style>
