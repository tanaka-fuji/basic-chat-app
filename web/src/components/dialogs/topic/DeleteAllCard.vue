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
    <v-form @submit.prevent="deleteAllTopic">
      <v-card-item>
        <v-card-text class="text-body-1 text-center">
          削除した全てのトピックは元には戻せません。本当に全て削除しますか？
        </v-card-text>
      </v-card-item>
      <div class="d-flex mb-5">
        <v-btn class="ms-auto" text="戻る" @click="topicDialog.isOpen = false">
        </v-btn>
        <v-btn class="ms-5 me-auto bg-error" type="submit" text="決定">
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>