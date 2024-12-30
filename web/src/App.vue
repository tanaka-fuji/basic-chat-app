<script setup>
import { RouterView } from 'vue-router';
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<style scoped>

</style>
