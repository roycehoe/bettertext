<script setup lang="ts">
import { io } from "socket.io-client"
import { isJoinedChat, messageForm, messageSessionHistory, useMessage } from '../composables/useMessage';


const { getAllMessage } = useMessage()



function setupMessageSocket() {
  const socket = io("http://localhost:8000")
  socket.on('connect', () => {
    socket.emit('room', messageForm.value.chatroom, messageForm.value.username)
      ;
  });
  socket.on('message', (data) => {
    console.log(data)
    messageSessionHistory.value.push(data)
    console.log(messageSessionHistory.value)
      ;
  });

  socket.on("messagesent", () => {
    const messageList = document.getElementById("messageList");
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
      console.log("scrolled")
    }
  })
}

</script>

<template>
  <form
    v-if="!isJoinedChat"
    @submit.prevent="isJoinedChat = !isJoinedChat; getAllMessage(); setupMessageSocket()"
  >
    <div class="min-h-screen bg-base-200">
      <div class="flex flex-col justify-center items-center mx-12">
        <div class="text-center mt-48">
          <h1 class="mb-5 text-5xl font-bold">Better Texts</h1>
          <p class="mb-5">Private chats, simplified</p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Alias</span>
              </label>
              <input
                v-model="messageForm.username"
                type="text"
                placeholder="alias"
                minlength="3"
                maxlength="20"
                required
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Chatroom</span>
              </label>
              <input
                v-model="messageForm.chatroom"
                type="text"
                minlength="3"
                maxlength="20"
                required
                placeholder="chatroom"
                class="input input-bordered"
              />
            </div>
            <div class="form-control mt-6">
              <input type="submit" value="Start chatting" class="btn btn-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style>
</style>
