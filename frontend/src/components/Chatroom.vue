<script setup lang="ts">
import { io } from "socket.io-client"
import { onBeforeMount, ref } from "vue";
import { isJoinedChat, MessageDisplay, messageForm, messageHistory, messageSessionHistory, SubmitMessageForm, useMessage } from "../composables/useMessage";
import Message from "./Message.vue";


const { createMessageResponse, createMessage } = useMessage()


async function sendMessage() {
  const socket = io("http://localhost:8000")
  await createMessage(messageForm.value)

  socket.emit('message', messageForm.value.chatroom, createMessageResponse.value)
  messageForm.value.message = ""
}

</script>

<template>
  <div v-if="isJoinedChat">
    <div class="bg-base-200 justify-center min-h-screen h-screen">
      <div
        class="bg-base-200 flex justify-center min-h-screen h-screen flex-col items-center mx-80"
      >
        <div class="w-full">
          <p class="font-mono my-5">Chatroom: {{ messageForm.chatroom }}</p>
        </div>

        <div class="card flex-shrink-0 shadow-2xl bg-base-100 w-full h-3/5">
          <div
            class="card-body scrollbar scrollbar-thumb-gray-800 scrollbar-track-gray-700 overflow-y-scroll"
          >
            <Message></Message>
          </div>
        </div>
        <form @submit.prevent="sendMessage" class="w-full mb-28 mt-2">
          <div class="card bg-base-200">
            <input
              v-model="messageForm.message"
              type="text"
              placeholder="Write a message..."
              class="input bg-base-100"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>
