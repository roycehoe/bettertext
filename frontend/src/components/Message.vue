<script setup lang="ts">
import { MessageDisplay, messageHistory, useMessage } from "../composables/useMessage";

function getTimeDisplay(message: MessageDisplay) {
  return `${message.time.month} ${message.time.day}, ${message.time.hour}:${message.time.minute}:${message.time.second} ${message.time.twelveHourText}`
}




</script>

<template>
  <div v-for="message in messageHistory">
    <div class="rounded-lg mt-3">
      <p class="mx-2 mb-1">{{ message.username }}:</p>
      <div class="bg-base-200 rounded-lg px-2">
        <p class="overflow-hidden">{{ message.message }}</p>
        <p class="text-right mr-2 text-info">{{ getTimeDisplay(message) }}</p>
      </div>
    </div>
  </div>
</template>

<style>
</style>
