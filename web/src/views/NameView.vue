<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter()
const username = ref("");

const usernameRules = [
  (value) => {
    if (1 <= value.length && value.length <= 10) {
      return true;
    }
    return "ニックネームは、1文字以上10文字以内で入力してください。";
  }
];

const onEnter = () => {
  if (1 <= username.value.length && username.value.length <= 10) {
    localStorage.setItem('username', username.value);
    router.push({ name: "chat" });
  }
}

</script>

<template>
  <v-row class="d-flex justify-center align-center" style="height: 70vh;">
    <v-card :elevation="5" width="700px">
      <v-card-title class="text-center mt-6">名前入力</v-card-title>
      <v-form @submit.prevent="onEnter">
        <v-card-text class="mt-6">
          <v-text-field type="text" label="ニックネーム（1文字〜10文字）" :rules="usernameRules" v-model.trim="username">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <div class="mx-auto my-5">
            <v-btn color="primary" variant="flat" class="align-center" type="submit">
              決定
            </v-btn>
          </div>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-row>
</template>