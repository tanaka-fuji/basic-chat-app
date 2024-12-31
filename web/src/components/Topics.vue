<script setup>
import { inject, onBeforeMount, ref } from 'vue';

const TopicCount = ref(0);
const Topics = ref([]);

const httpClient = inject('httpClient');

onBeforeMount(async () => {
  try {
    const res = await httpClient.get('/topics');
    if (res.status === 200) {
      TopicCount.value = res.data.count;
      Topics.value = res.data.rows;
      console.log(Topics.value);
      
    }
  } catch (error) {
    console.log(error);
  }
});

</script>

<template>
</template>