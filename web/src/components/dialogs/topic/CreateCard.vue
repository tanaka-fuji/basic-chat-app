<script setup>
import { inject, ref } from 'vue';

const httpClient = inject('httpClient');
const topicDialog = inject('topicDialog');
const topicNameRules = inject('topicNameRules');
const topicDescRules = inject('topicDescRules');

const createTopicForm = ref({});
const topicName = ref('');
const topicDesc = ref('');

const createTopic = async () => {
  const validResult = await createTopicForm.value.validate();
  if (!validResult.valid) {
    return;
  }
  try {
    const res = await httpClient.post('/topics', {
      name: topicName.value,
      description: topicDesc.value
    });
    if (res.status === 201) {
      topicDialog.isOpen = false;
      createTopicForm.value.reset();
    }
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <v-card prepend-icon="mdi-message-plus-outline" title="トピックを作成する">
    <v-form ref="createTopicForm" @submit.prevent="createTopic">
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
        <v-btn class="ms-5 me-auto bg-primary" type="submit" text="作成">
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>