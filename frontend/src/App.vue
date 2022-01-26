<script setup lang="ts">
import { io } from "socket.io-client"
import { ref } from "vue";

const message = ref()
const messageForm = ref()
const socket = io("http://localhost:8000")


function sendMessage() {
  socket.on('message', (data) => {
    message.value = data
  })
  socket.emit('message', messageForm.value)
}


</script>

<template>
  <input v-model="messageForm" type="text" />
  <button @click="sendMessage">Send message</button>
  <p>here are the messages: {{ message }}</p>
</template>

<style>
</style>
