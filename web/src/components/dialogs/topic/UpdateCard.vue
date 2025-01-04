<script setup>
import { inject, ref } from 'vue';

const httpClient = inject('httpClient');
const topicDialog = inject('topicDialog');
const topicNameRules = inject('topicNameRules');
const topicDescRules = inject('topicDescRules');
const conversation = inject('conversation');

const topicName = ref(conversation.topicName);
const topicDesc = ref(conversation.topicDesc);

const updateTopic = async () => {
  try {
    const res = await httpClient.put(`topics/${conversation.topicId}`, {
      name: topicName.value,
      description: topicDesc.value
    });
    if (res.status === 200) {
      topicDialog.isOpen = false;
      topicName.value = '';
      topicDesc.value = '';
    }
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <v-card prepend-icon="mdi-square-edit-outline" title="トピックを編集する">
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
      <v-btn class="ms-auto" text="戻る" @click="topicDialog.isOpen = false">
      </v-btn>
      <v-btn class="me-auto bg-primary" text="決定" @click="updateTopic">
      </v-btn>
    </template>
  </v-card>
</template>