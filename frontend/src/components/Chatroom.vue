<script setup lang="ts">
import { io } from "socket.io-client"
import { onBeforeMount, ref } from "vue";
import { isJoinedChat, MessageDisplay, messageForm, messageHistory, SubmitMessageForm, useMessage } from "../composables/useMessage";


const { createMessageResponse, createMessage } = useMessage()
const messageSessionHistory = ref([] as Array<MessageDisplay>)

const socket = io("http://localhost:8000")

async function sendMessage() {
  await createMessage(messageForm.value)
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
    <div class="hero min-h-screen bg-base-200">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <p>Messages go here</p>
          <p>Messages go here</p>
          <p>Messages go here</p>
          <p>Messages go here</p>
          <p>Messages go here</p>
        </div>
        <form @submit.prevent="sendMessage">
          <div class="card bg-base-200 rounded-none">
            <input
              v-model="messageForm.message"
              type="text"
              placeholder="Write a message..."
              class="input bg-base-200"
            />
          </div>
        </form>
      </div>
    </div>
    <p>message form: {{ messageForm }}</p>
    <p>Broadcasted message: {{ messageSessionHistory }}</p>
    <p>Message database: {{ messageHistory }}</p>
  </div>
</template>

<style>
</style>
