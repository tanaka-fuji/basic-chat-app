<script setup>
import { inject } from 'vue';

const httpClient = inject('httpClient');
const topicDialog = inject('topicDialog');
const conversation = inject('conversation');

const deleteTopic = async () => {
  try {
    const res = await httpClient.delete(`topics/${conversation.topicId}`, {});
    if (res.status === 204) {
      topicDialog.isOpen = false;
    }
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <v-card prepend-icon="mdi-trash-can-outline" title="トピックを削除する">
    <v-form @submit.prevent="deleteTopic">
      <v-card-item>
        <v-card-text class="text-body-1 text-center">
          削除したトピックは元には戻せません。本当に削除しますか？
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