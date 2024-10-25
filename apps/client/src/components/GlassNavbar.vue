<template>
  <nav class="glass-navbar" :class="{ 'dark-theme': isDarkTheme }">
    <div class="nav-content">
      <div class="logo-container" @click="goHome">
        <img :src="currentLogo" alt="github" class="logo" />
        <span class="site-name">GitHub Rank</span>
      </div>
      <div class="search-container">
        <input type="text" placeholder="搜索..." class="search-input" />
      </div>
      <div class="login-container">
        <GitHubLogin class="nav-item" />
        <button @click="toggleTheme" class="theme-toggle">
          {{ isDarkTheme ? '🌞' : '🌙' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import GitHubLogin from './GitHubLogin.vue';
import githubMark from '../assets/github-mark.svg';
import githubMarkWhite from '../assets/github-mark-white.svg';

const githubIcon = [
  githubMark,
  githubMarkWhite
];

const isDarkTheme = ref(false);
const router = useRouter();

const currentLogo = computed(() => githubIcon[isDarkTheme.value ? 1 : 0]);

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  localStorage.setItem('theme', String(isDarkTheme.value));
  document.body.classList.toggle('dark-theme', isDarkTheme.value);
};

const goHome = () => {
  router.push('/');
};

onBeforeMount(() => {
  const theme = localStorage.getItem('theme') === 'true';
  isDarkTheme.value = theme;
  document.body.classList.toggle('dark-theme', theme);
});
</script>

<style>
:root {
  --bg-color: rgba(255, 255, 255, 0.7);
  --text-color: #333;
  --hover-bg-color: rgba(255, 255, 255, 0.5);
  --border-color: rgba(0, 0, 0, 0.1);
  --shadow-color: rgba(0, 0, 0, 0.1);
  --search-bg-color: rgba(255, 255, 255, 0.9);
}

.dark-theme {
  --bg-color: rgba(0, 0, 0, 0.6);
  --text-color: #fff;
  --hover-bg-color: rgba(255, 255, 255, 0.1);
  --border-color: rgba(255, 255, 255, 0.1);
  --shadow-color: rgba(0, 0, 0, 0.4);
  --search-bg-color: rgba(255, 255, 255, 0.1);
}
</style>

<style scoped>
.glass-navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  height: 80px;
  background: var(--bg-color);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  box-shadow: 0 8px 32px var(--shadow-color);
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
}

.logo-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.site-name {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--text-color);
}

.search-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;
}

.search-input {
  width: 100%;
  max-width: 600px;
  padding: 0 0.75rem;
  font-size: 1rem;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--search-bg-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
  box-shadow: 0 0 0 2px var(--border-color), 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input::placeholder {
  color: var(--text-color);
  opacity: 0.5;
}

.login-container {
  display: flex;
  align-items: center;
}

.nav-item {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.nav-item:hover {
  background-color: var(--hover-bg-color);
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.theme-toggle:hover {
  background-color: var(--hover-bg-color);
}
</style>
