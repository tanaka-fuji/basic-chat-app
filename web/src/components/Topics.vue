<script setup>
import { inject, onBeforeMount, ref } from 'vue';

const httpClient = inject('httpClient');
const conversation = inject('conversation');

const topicCount = ref(0);
const topics = ref([]);

const selectedCardId = ref(0);

onBeforeMount(async () => {
  try {
    const res = await httpClient.get('/topics');
    if (res.status === 200) {
      topicCount.value = res.data.count;
      topics.value = res.data.rows;
    }
  } catch (error) {
    console.error(error);
  }
});

const fetchMessages = async (topic) => {
  try {
    const res = await httpClient.get(`/topics/${topic.id}/messages`);
    if (res.status === 200) {
      conversation.topicId = topic.id;
      conversation.topicName = topic.name;
      conversation.topicDesc = topic.description;
      conversation.msgCount = res.data.count;
      conversation.messages = res.data.rows;
      conversation.messages.forEach(msg => {
        msg.createdAt = new Date(msg.createdAt).toLocaleString("ja", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          weekday: "narrow"
        });
      });
      conversation.isVisible = true;
    }
  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <div class="overflow-auto mx-4 bg-grey-lighten-3" style="height: 80vh;border-radius: 10px;">
    <div class="pa-4 bg-grey-darken-3" style="position: sticky; top: 0; z-index: 1;border-radius: 10px;">
      トピック数: {{ topicCount }}
    </div>
    <v-card
      class="ma-2"
      :class="selectedCardId === topic.id ? 'selected-card': ''"
      height="100"
      elevation="1"
      variant="outlined"
      @click="fetchMessages(topic); selectedCardId=topic.id"
      v-for="(topic,i) in topics" :key="i">
      <v-card-item>
        <v-card-title>{{ topic.name }}</v-card-title>
        <v-card-subtitle>{{ topic.description }}</v-card-subtitle>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped>
.selected-card {
  background-color: rgb(200, 200, 200);
}
</style>