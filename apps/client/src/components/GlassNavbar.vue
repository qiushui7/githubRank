<template>
  <div class="navbar-container">
    <nav class="glass-navbar" :class="{ 'dark-theme': isDarkTheme }">
      <div class="nav-content">
        <div class="logo-container" @click="goHome">
          <img :src="currentLogo" alt="github" class="logo" />
          <span class="site-name">GitHub Rank</span>
        </div>
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            placeholder="搜索..."
            class="search-input"
          />
        </div>
        <div class="right-container">
          <div class="login-container">
            <template v-if="isAuth">
              <img
                :src="userInfo.avatar_url"
                :alt="userInfo.login"
                class="github-avatar"
              />
            </template>
            <template v-else>
              <GitHubLogin class="nav-item" />
            </template>
            <button @click="toggleTheme" class="theme-toggle">
              {{ isDarkTheme ? '🌞' : '🌙' }}
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject, Ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { isAuthenticated } from '../service/auth';
import GitHubLogin from './GitHubLogin.vue';
import githubMark from '../assets/github-mark.svg';
import githubMarkWhite from '../assets/github-mark-white.svg';

// 定义 props
const props = defineProps<{
  changeTheme?: (isDark: boolean) => void;
}>();

const githubIcon = [githubMark, githubMarkWhite];

const isDarkTheme = inject<Ref<boolean>>('isDarkTheme', ref(false));
const isAuth = ref(false);
const userInfo = ref<{ avatar_url: string; login: string }>({
  avatar_url: '',
  login: '',
});
const router = useRouter();
const route = useRoute();
const searchQuery = ref('');

const currentLogo = computed(() => githubIcon[isDarkTheme.value ? 1 : 0]);

const toggleTheme = () => {
  // 调用父组件传入的 changeTheme 方法
  if (props.changeTheme) {
    props.changeTheme(isDarkTheme.value);
  }
};

const goHome = () => {
  router.push('/');
};

onMounted(async () => {
  isAuth.value = await isAuthenticated();
  userInfo.value = JSON.parse(localStorage.getItem('user_info') || '{}');
});

// 处理搜索
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { keyword: searchQuery.value.trim() },
    });
    searchQuery.value = ''; // 清空搜索框
  }
};

// 如果在搜索页面，自动填充搜索框
onMounted(() => {
  if (route.path === '/search' && route.query.keyword) {
    searchQuery.value = route.query.keyword as string;
  }
});
</script>

<style scoped>
.glass-navbar {
  width: 100%;
  height: 80px;
  background: var(--bg-color);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  box-shadow: 0 8px 32px var(--shadow-color);
  z-index: 1000;
  transition: all 0.3s ease;
  padding: 0 10px;
  margin: 20px auto;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
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
  box-shadow:
    0 0 0 2px var(--border-color),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input::placeholder {
  color: var(--text-color);
  opacity: 0.5;
}

.right-container {
  display: flex;
  align-items: center;
}

.login-container {
  display: flex;
  align-items: center;
  margin-right: 1rem;
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
  border: 1px solid var(--border-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background-color: var(--hover-bg-color);
  box-shadow: 0 2px 4px var(--shadow-color);
}

.github-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;
}

.navbar-container {
  top: 0;
  position: sticky;
  z-index: 1000;
  width: 80vw;
  max-width: 1600px;
  display: flex;
  justify-content: center;
}
</style>
