<script setup>
import { inject, onBeforeMount, ref } from 'vue';

const topicsCount = ref(0);
const topics = ref([]);

const httpClient = inject('httpClient');

onBeforeMount(async () => {
  try {
    const res = await httpClient.get('/topics');
    if (res.status === 200) {
      topicsCount.value = res.data.count;
      topics.value = res.data.rows;
      console.log(topics.value);
      
    }
  } catch (error) {
    console.error(error);
  }
});

const fetchMessages = async (id) => {
  try {
    const res = await httpClient.get(`/topics/${id}/messages`);
  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <div class="overflow-auto" style="background-color: white;height: 80vh;">
    トピック数: {{ topicsCount }}
    <v-card class="mt-1" height="100" variant="outlined" link @click="fetchMessages(topic.id)" v-for="(topic,i) in topics" :key="i">
      <v-card-item>
        <v-card-title>{{ topic.name }}</v-card-title>
        <v-card-subtitle>{{ topic.description }}</v-card-subtitle>
      </v-card-item>
    </v-card>
  </div>
</template>