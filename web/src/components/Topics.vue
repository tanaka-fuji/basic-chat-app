<script setup>
import { inject, onBeforeMount, onMounted, reactive, ref } from 'vue';

const socketClient = inject('socketClient');
const httpClient = inject('httpClient');
const conversation = inject('conversation');
const topicDialog = inject('topicDialog');
const topicCount = ref(0);
const topics = ref([]);

const selectedCardId = ref(0);

//localStorageをリアクティブにできないため、リアクティブな変数にコピーする
const storageData = reactive({});
Object.keys(localStorage).forEach(key => {
  storageData[key] = localStorage.getItem(key);
});

onBeforeMount(async () => {
  try {
    const res = await httpClient.get('/topics');
    if (res.status === 200) {
      topicCount.value = res.data.count;
      topics.value = res.data.rows;
      topics.value.forEach(topic => {
        topic.last_sent_at = new Date(topic.last_sent_at).getTime();
      });
    }
  } catch (error) {
    console.error(error);
  }
});

onMounted(() => {
  registerSocketEvent();
});

const registerSocketEvent = () => {
  socketClient.on('createTopicEvent', (topic) => {
    topic.last_sent_at = new Date(topic.last_sent_at).getTime();
    topics.value.unshift(topic);
    topicCount.value += 1;
  });
  socketClient.on('updateTopicEvent', (topic) => {
    topics.value.forEach(t => {
      if (t.id === topic.id) {
        t.name = topic.name;
        t.description = topic.description;
        t.updatedAt = topic.updatedAt;
      }
    });
    if (conversation.topicId === topic.id) {
      conversation.topicName = topic.name;
      conversation.topicDesc = topic.description;
    }
  });
  socketClient.on('deleteTopicEvent', (topicId) => {
    topics.value = topics.value.filter(topic => topic.id !== topicId);
    topicCount.value -= 1;
    if (conversation.topicId === topicId) {
      Object.keys(conversation).forEach(key => {
        delete conversation[key];
      });
    }
  });
  socketClient.on('deleteAllTopicEvent', () => {
    topics.value = [];
    topicCount.value = 0;
    Object.keys(conversation).forEach(key => {
      delete conversation[key];
    });
  });
  socketClient.on('createMessageEvent', (message) => {
    topics.value.forEach(topic => {
      if (topic.id === message.topic_id) {
        topic.last_sent_at = new Date(message.createdAt).getTime();
      }
    });
    if (conversation.topicId === message.topic_id) {
      const currnetTime = new Date().getTime();
      localStorage.setItem(conversation.topicId, currnetTime);
      storageData[conversation.topicId] = currnetTime;
      conversation.messages.push(message);
    }
  });
}

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
      const currnetTime = new Date().getTime();
      localStorage.setItem(topic.id, currnetTime);
      storageData[topic.id] = currnetTime;
    }
  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <div class="overflow-auto mx-4 bg-grey-lighten-3" style="height: 80vh;border-radius: 10px;">
    <div class="pa-4 d-flex justify-space-between bg-light-blue-darken-3"
      style="position: sticky; top: 0; z-index: 1;border-radius: 10px;">
      <span>{{ topicCount }} Topics</span>
      <span>
        <v-btn icon class="bg-grey-darken-3" size="x-small"
          @click="topicDialog.isOpen = true; topicDialog.mode = 'create'">
          <v-icon icon="mdi-message-plus" />
        </v-btn>
        <v-btn icon class="bg-red ms-3" size="x-small"
          @click="topicDialog.isOpen = true; topicDialog.mode = 'deleteAll'">
          <v-icon icon="mdi-delete-sweep-outline" />
        </v-btn>
      </span>
    </div>
    <v-card class="ma-2"
      :class="[selectedCardId === topic.id ? 'selected-card' : '', storageData[topic.id] && storageData[topic.id] > topic.last_sent_at ? '' : 'bg-white']"
      height="100" elevation="1" variant="outlined" @click="fetchMessages(topic); selectedCardId = topic.id"
      v-for="(topic, i) in topics" :key="i">
      <v-card-item>
        <v-card-title>{{ topic.name }}</v-card-title>
        <v-card-subtitle>{{ topic.description }}</v-card-subtitle>
        <div class="d-flex justify-end" v-if="!(storageData[topic.id] && storageData[topic.id] > topic.last_sent_at)">
          <v-icon icon="mdi-bell-ring-outline" color="info" />
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped>
.selected-card {
  background-color: rgb(170, 170, 170);
}
</style>