<script setup>
import { inject, ref } from 'vue';

const httpClient = inject('httpClient');
const topicDialog = inject('topicDialog');
const topicNameRules = inject('topicNameRules');
const topicDescRules = inject('topicDescRules');
const conversation = inject('conversation');

const updateTopicForm = ref({});
const topicName = ref(conversation.topicName);
const topicDesc = ref(conversation.topicDesc);

const updateTopic = async () => {
  const validResult = await updateTopicForm.value.validate();
  if (!validResult.valid) {
    return;
  }
  try {
    const res = await httpClient.put(`topics/${conversation.topicId}`, {
      name: topicName.value,
      description: topicDesc.value
    });
    if (res.status === 200) {
      topicDialog.isOpen = false;
      updateTopicForm.value.reset();
    }
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <v-card prepend-icon="mdi-square-edit-outline" title="トピックを編集する">
    <v-form ref="updateTopicForm" @submit.prevent="updateTopic">
      <v-card-item>
        <v-card-text>
          <v-text-field type="text" label="トピック名（1文字〜10文字）" :rules="topicNameRules" v-model.trim="topicName">
          </v-text-field>
          <v-text-field class="mt-8" type="text" label="説明文（0文字〜100文字）" :rules="topicDescRules"
            v-model.trim="topicDesc">
          </v-text-field>
        </v-card-text>
      </v-card-item>
      <div class="d-flex mb-5">
        <v-btn class="ms-auto" text="戻る" @click="topicDialog.isOpen = false">
        </v-btn>
        <v-btn class="ms-5 me-auto bg-primary" type="submit" text="決定">
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>