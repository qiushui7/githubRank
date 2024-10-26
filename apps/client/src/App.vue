<template>
  <div class="app-container">
    <GlassNavbar />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import GlassNavbar from './components/GlassNavbar.vue';

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

.app-container {
  padding-top: 80px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
