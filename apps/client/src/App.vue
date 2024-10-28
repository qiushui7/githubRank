<template>
  <div class="app-container">
    <ClientOnly>
      <GlassNavbar :changeTheme="changeTheme" />
    </ClientOnly>
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, onBeforeMount } from 'vue';
import GlassNavbar from './components/GlassNavbar.vue';
import ClientOnly from '@duannx/vue-client-only';

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
</script>

<style>
:root {
  --bg-gradient-light: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --bg-gradient-dark: linear-gradient(135deg, #2c3e50 0%, #1a1a1a 100%);
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: var(--bg-gradient-light);
  min-height: 100vh;
  transition: background 0.3s ease;
}

body.dark-theme {
  background: var(--bg-gradient-dark);
  color: #fff;
}

.main-content {
  width: 80vw;
  max-width: 1600px;
  margin: 0 auto;
}
</style>
