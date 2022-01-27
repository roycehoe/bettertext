<script setup lang="ts">
import { io } from "socket.io-client"
import { onBeforeMount, ref } from "vue";
import { isJoinedChat, MessageDisplay, messageForm, messageHistory, messageSessionHistory, SubmitMessageForm, useMessage } from "../composables/useMessage";
import Message from "./Message.vue";


const { createMessageResponse, createMessage } = useMessage()

const socket = io("http://localhost:8000")

async function sendMessage() {
  await createMessage(messageForm.value)
  socket.emit('message', createMessageResponse.value)
  messageForm.value.message = ""
}

async function setupMessageSocket() {
  socket.on('message', (data) => {
    console.log(data)
    messageSessionHistory.value.push(data)
  })
}


onBeforeMount(() => { setupMessageSocket() })

</script>

<template>
  <div v-if="isJoinedChat">
    <div class="min-h-screen min-w-full bg-base-200 flex justify-center">
      <div class="card flex-shrink-0 w-full max-w-2xl my-28 shadow-2xl bg-base-100">
        <div class="card-body">
          <Message></Message>
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
  </div>
</template>

<style>
</style>
