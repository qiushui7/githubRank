<template>
  <div class="app-container">
    <GlassNavbar :changeTheme="changeTheme" />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, onBeforeMount } from 'vue';
import GlassNavbar from './components/GlassNavbar.vue';
import { createAuthStore } from './utils/useAuthStore';

const isDarkTheme = ref(false);
provide('isDarkTheme', isDarkTheme);

const changeTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  localStorage.setItem('isDarkTheme', String(isDarkTheme.value));
  document.body.classList.toggle('dark-theme', isDarkTheme.value);
};
onBeforeMount(() => {
  const theme = localStorage.getItem('isDarkTheme') === 'true';
  isDarkTheme.value = theme;
  document.body.classList.toggle('dark-theme', theme);
});

const authStore = createAuthStore();
provide('authStore', authStore);
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: var(--bg-gradient);
  min-height: 100vh;
  transition: background 0.3s ease;
}

.main-content {
  max-width: 1600px;
  margin: 0 auto;
}
</style>
