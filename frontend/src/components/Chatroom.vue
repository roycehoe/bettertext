<script setup lang="ts">
import { io } from "socket.io-client"
import { isJoinedChat, messageForm, useMessage } from "../composables/useMessage";
import Message from "./Message.vue";


const { createMessageResponse, createMessage, resetMessageForm } = useMessage()


async function sendMessage() {
  const socket = io()
  await createMessage(messageForm.value)

  socket.emit('message', messageForm.value.chatroom, createMessageResponse.value)

  messageForm.value.message = ""
}

function socketLogout() {
  const socket = io()
  socket.emit('logout', messageForm.value.chatroom)
}




</script>

<template>
  <div v-if="isJoinedChat">
    <div class="bg-base-200 justify-center min-h-screen h-screen">
      <div
        class="bg-base-200 flex justify-center min-h-screen h-screen flex-col items-center lg:mx-80"
      >
        <div class="w-full flex justify-between px-8">
          <div class="flex items-center">
            <p class="font-mono inline-block text-center">Chatroom: {{ messageForm.chatroom }}</p>
          </div>
          <input
            @click="isJoinedChat = !isJoinedChat; socketLogout(); resetMessageForm()"
            type="button"
            value="Exit chat"
            class="btn inline-block ml-auto mr-0 text-right"
          />
        </div>

        <div class="card flex-shrink-0 shadow-2xl bg-base-100 w-full h-4/5">
          <div
            class="card-body scrollbar scrollbar-thumb-gray-800 scrollbar-track-gray-700 overflow-y-scroll"
            id="messageList"
          >
            <Message></Message>
          </div>
        </div>
        <form @submit.prevent="sendMessage" class="w-full mt-2">
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
