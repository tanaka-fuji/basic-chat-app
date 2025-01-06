<script setup>
import { inject, nextTick, ref, watch } from 'vue';

const httpClient = inject('httpClient');
const conversation = inject('conversation');
const topicDialog = inject('topicDialog');

const username = localStorage.getItem('username');

const createMsgForm = ref({});
const text = ref('');

const textRules = [
  (value) => {
    if (1 <= value.length && value.length <= 100) {
      return true;
    }
    return "メッセージ本文は、1文字以上100文字以内で入力してください。";
  }
];

const createMessage = async () => {
  const validResult = await createMsgForm.value.validate();
  if (!validResult.valid) {
    return;
  }
  try {
    const res = await httpClient.post(`topics/${conversation.topicId}/messages`, {
      text: text.value,
      username: localStorage.getItem('username')
    });
    if (res.status === 201) {
      createMsgForm.value.reset();
    }
  } catch (error) {
    console.log(error);
  }
};

watch(conversation, async () => {
  await nextTick();
  const area = document.getElementById('messages-area');
  area.scrollTop = area.scrollHeight;
});

</script>

<template>
  <div id="messages-area" class="overflow-auto bg-amber-lighten-5" v-if="conversation.isVisible"
    style="height: 80vh;border-radius: 10px;">
    <!-- トピック名と説明文、ダイアログ表示用ボタン -->
    <v-expansion-panels class="mb-1" style="position: sticky; top: 0; z-index: 1;border-radius: 10px;">
      <v-expansion-panel bg-color="white">
        <v-expansion-panel-title class="pb-5" color="grey-darken-3">
          {{ conversation.topicName }} （{{ conversation.msgCount }} messages）
        </v-expansion-panel-title>
        <v-expansion-panel-text style="border: 1px solid gray;">
          <v-row>
            <v-col cols="9" class="mt-1">
              {{ conversation.topicDesc }}
            </v-col>
            <v-col cols="3" class="d-flex justify-end">
              <v-btn icon class="bg-amber-lighten-5" size="x-small"
                @click="topicDialog.isOpen = true; topicDialog.mode = 'update';">
                <v-icon icon="mdi-square-edit-outline" />
              </v-btn>
              <v-btn icon class="ms-3 bg-amber-lighten-5" size="x-small"
                @click="topicDialog.isOpen = true; topicDialog.mode = 'delete';">
                <v-icon icon="mdi-trash-can-outline" color="red" />
              </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- メッセージ一覧 -->
    <div class="ma-3" v-for="(msg, i) in conversation.messages" :key="i">
      <v-card :class="username === msg.username ? 'my-message' : 'other-message'" elevation="5">
        <v-card-subtitle class="d-flex justify-space-between">
          <span>{{ msg.username }}</span>
          <span>{{ msg.createdAt }}</span>
        </v-card-subtitle>
        <v-card-text class="text-body-1">
          {{ msg.text }}
        </v-card-text>
      </v-card>
    </div>
    <div class="pt-4 bg-amber-lighten-5" style="position: sticky; bottom: 0; z-index: 1;  border-radius: 10px;">
      <v-form ref="createMsgForm" @submit.prevent="createMessage" class="d-flex">
        <v-textarea v-model="text" :rules="textRules" class="ps-4" prepend-icon="mdi-comment" maxlength="100" rows="1"
          variant="outlined" auto-grow counter></v-textarea>
        <v-btn type="submit" class="me-5 ma-3" color="success">
          <v-icon icon="mdi-send-variant" />
        </v-btn>
      </v-form>
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