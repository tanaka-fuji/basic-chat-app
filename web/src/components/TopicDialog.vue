<script setup>
import { inject, provide } from 'vue';
import CreateCard from './dialogs/topic/CreateCard.vue';
import DeleteCard from './dialogs/topic/DeleteCard.vue';
import UpdateCard from './dialogs/topic/UpdateCard.vue';

const topicDialog = inject('topicDialog');

const topicNameRules = [
  (value) => {
    if (1 <= value.length && value.length <= 10) {
      return true;
    }
    return "トピック名は、1文字以上10文字以内で入力してください。";
  }
];

const topicDescRules = [
  (value) => {
    if (value.length <= 100) {
      return true;
    }
    return "説明文は、100文字以内で入力してください。";
  }
];

provide('topicNameRules', topicNameRules);
provide('topicDescRules', topicDescRules);
</script>

<template>
  <v-dialog v-model="topicDialog.isOpen" width="700">
    <CreateCard v-if="topicDialog.mode === 'create'" />
    <UpdateCard v-else-if="topicDialog.mode === 'update'" />
    <DeleteCard v-else-if="topicDialog.mode === 'delete'" />
  </v-dialog>
</template>