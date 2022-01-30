<script setup lang="ts">
import { io } from "socket.io-client"
import { onBeforeMount, ref } from "vue";
import { isJoinedChat, MessageDisplay, messageForm, messageHistory, messageSessionHistory, SubmitMessageForm, useMessage } from "../composables/useMessage";
import Message from "./Message.vue";


const { createMessageResponse, createMessage } = useMessage()

const socket = io("http://localhost:8000")

async function sendMessage() {
  const socket = io("http://localhost:8000")
  await createMessage(messageForm.value)

  // socket.emit('message', createMessageResponse.value)
  socket.emit('message', messageForm.value.chatroom, createMessageResponse.value)
  messageForm.value.message = ""
  // setTimeout(() => { window.scroll(0, 999999) }, 1000)
  // window.scroll(0, 999999)
}

// async function setupMessageSocket() {
//   socket.on('message', (data) => {
//     console.log(data)
//     messageSessionHistory.value.push(data)
//   })
// }


// onBeforeMount(() => { setupMessageSocket() })

</script>

<template>
  <div v-if="isJoinedChat">
    <div class="min-h-screen min-w-full bg-base-200 flex justify-center">
      <div class="card flex-shrink-0 w-full max-w-2xl my-28 shadow-2xl bg-base-100">
        <div class="card-body">
          <Message></Message>
        </div>
      </div>
    </div>
    <form @submit.prevent="sendMessage" class="sticky bottom-0 bg-green-900">
      <div class="card bg-base-100 rounded-none">
        <input
          v-model="messageForm.message"
          type="text"
          placeholder="Write a message..."
          class="input bg-base-100"
        />
      </div>
    </form>
  </div>
</template>

<style>
</style>
