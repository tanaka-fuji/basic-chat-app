<script setup>
import { inject } from 'vue';

const httpClient = inject('httpClient');
const topicDialog = inject('topicDialog');

const deleteAllTopic = async () => {
  try {
    const res = await httpClient.delete('topics', {});
    if (res.status === 204) {
      topicDialog.isOpen = false;
    }
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <v-card prepend-icon="mdi-delete-sweep-outline" title="全てのトピックを削除する">
    <v-card-item>
      <v-card-text class="text-body-1 text-center">
        削除した全てのトピックは元には戻せません。本当に全て削除しますか？
      </v-card-text>
    </v-card-item>
    <template v-slot:actions>
      <v-btn class="ms-auto" text="戻る" @click="topicDialog.isOpen = false">
      </v-btn>
      <v-btn class="me-auto bg-error" text="決定" @click="deleteAllTopic">
      </v-btn>
    </template>
  </v-card>
</template>