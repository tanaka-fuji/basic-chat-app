<script setup>
import { inject } from 'vue';

const httpClient = inject('httpClient');
const conversation = inject('conversation');

const username = localStorage.getItem('username');

</script>

<template>
  <div class="overflow-auto p-4 bg-amber-lighten-5" v-if="conversation.isVisible" style="height: 80vh;border-radius: 10px;">
    <div class="pa-4 bg-grey-darken-3" style="position: sticky; top: 0; z-index: 1;border-radius: 10px;">
      {{ conversation.topicName }} （{{ conversation.msgCount }} messages）
    </div>
    <!-- topicDescをトグルで表示するようにする -->
    <div class="ma-3">{{ conversation.topicDesc }}</div>
    <div class="ma-3" v-for="(msg, i) in conversation.messages" :key="i">
        <v-card :class="username===msg.username ? 'my-message': 'other-message'" elevation="5">
          <v-card-subtitle class="d-flex justify-space-between">
            <span>{{ msg.username }}</span>
            <span>{{ msg.createdAt }}</span>
          </v-card-subtitle>
          <v-card-text class="text-body-1">
            {{ msg.text }}
          </v-card-text>
        </v-card>
    </div>
  </div>
</template>

<style scoped>
.my-message {
  padding-top: 7px;
  border-radius: 12px;
  background: #9ecef6;
  border: 0.1px solid black;
}

.other-message {
  padding-top: 7px;
  border-radius: 12px;
  background: #ffffff;
  border: 0.1px solid black;
}
</style>