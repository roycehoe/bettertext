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
    <!-- <div class="bg-base-200 flex justify-center">
      <div
        class="card flex-shrink-0 max-w-2xl my-28 shadow-2xl bg-base-100 overflow-y-scroll w-4/5 block h-4/5"
      >
        <div class="card-body">
          <Message></Message>
        </div>
      </div>
    </div>-->
    <!-- <form @submit.prevent="sendMessage" class="sticky bottom-0 bg-green-900">
      <div class="card bg-base-100 rounded-none">
        <input
          v-model="messageForm.message"
          type="text"
          placeholder="Write a message..."
          class="input bg-base-100"
        />
      </div>
    </form>-->
    <div class="bg-base-200 flex justify-center min-h-screen h-screen flex-col items-center">
      <div
        class="card flex-shrink-0 max-w-4xl mt-28 shadow-2xl bg-base-100 overflow-auto w-4/5 block h-4/5"
      >
        <div class="card-body">
          <Message></Message>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="w-full max-w-4xl mb-28 mt-2">
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
  </div>
</template>

<style>
</style>
