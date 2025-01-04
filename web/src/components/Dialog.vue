<script setup>
import { inject, ref } from 'vue';

const httpClient = inject('httpClient');
const dialog = inject('dialog');

const topicCount = inject('topicCount');
const topics = inject('topics');

const topicName = ref('');
const topicDesc = ref('');

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

const createTopic = async () => {
  try {
    const res = await httpClient.post('/topics', {
      name: topicName.value,
      description: topicDesc.value
    });
    if (res.status === 201) {
      dialog.isOpen = false;
      topicName.value = '';
      topicDesc.value = '';
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <v-dialog v-model="dialog.isOpen" width="700">
    <v-card prepend-icon="mdi-message-plus-outline" title="トピックを作成する">
      <v-card-item>
        <v-card-text>
          <v-form @submit.prevent="">
            <v-text-field type="text" label="トピック名（1文字〜10文字）" :rules="topicNameRules" v-model.trim="topicName">
            </v-text-field>
            <v-text-field class="mt-8" type="text" label="説明文（0文字〜100文字）" :rules="topicDescRules"
              v-model.trim="topicDesc">
            </v-text-field>
          </v-form>
        </v-card-text>
      </v-card-item>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="戻る" @click="dialog.isOpen = false">
        </v-btn>
        <v-btn class="me-auto bg-primary" text="作成" @click="createTopic">
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>