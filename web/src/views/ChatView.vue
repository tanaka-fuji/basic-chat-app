<script setup>
import Messages from '@/components/Messages.vue';
import TopicDialog from '@/components/TopicDialog.vue';
import Topics from '@/components/Topics.vue';
import axios from 'axios';
import { io } from 'socket.io-client';
import { provide, reactive } from 'vue';

const API_ORIGIN = `${location.protocol}//${location.hostname}:${import.meta.env.VITE_API_PORT}`;

const socketClient = io(API_ORIGIN);

const httpClient = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  }
});

httpClient.interceptors.response.use(
  response => response,
  error => {
    switch (error.status) {
      case 400:
        alert(error.response.data.errors[0].msg); //サーバー側で定義したバリデーションエラーメッセージを表示
        break;
      case 404:
        alert('アクセスしようとしたページが見つかりません。');
        break;
      case 500:
        alert('サーバー内部エラーが発生しました。時間を空けて再度アクセスしてください。');
        break;
      default:
        alert('予期せぬエラーが発生しました。時間を空けて再度アクセスしてください。')
        break;
    }
    return error;
  }
)

provide('socketClient', socketClient);
provide('httpClient', httpClient);
provide('conversation', reactive({}));
provide('topicDialog', reactive({ isOpen: false }));

</script>

<template>
  <v-row>
    <v-col cols="4">
      <Topics />
    </v-col>
    <v-col cols="8">
      <Messages />
    </v-col>
  </v-row>
  <TopicDialog />
</template>