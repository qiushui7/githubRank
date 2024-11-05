<template>
  <div class="navbar-container">
    <nav class="glass-navbar">
      <div class="nav-content">
        <ClientOnly>
          <div class="logo-container" @click="goHome">
            <img :src="currentLogo" alt="github" class="logo" />
            <span class="site-name">GitHub Rank</span>
          </div>
        </ClientOnly>
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            :placeholder="t('nav.search')"
            class="search-input"
          />
        </div>
        <div class="right-container">
          <div class="login-container">
            <template v-if="isAuth">
              <div class="avatar-dropdown">
                <img
                  :src="userInfo.avatar_url"
                  :alt="userInfo.login"
                  class="github-avatar"
                  @click="navigateToUserInfo"
                />
                <div class="dropdown-menu">
                  <div class="user-info">
                    <span>{{ userInfo.login }}</span>
                  </div>
                  <div class="divider"></div>
                  <div class="menu-item" @click="navigateToUserInfo">
                    {{ t('nav.profile') }}
                  </div>
                  <div class="menu-item" @click="handleLogout">
                    {{ t('nav.logout') }}
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <GitHubLogin class="nav-item" />
            </template>
            <div class="locale-dropdown">
              <div class="locale-toggle">
                {{ getCurrentLocaleInfo.flag }}
              </div>
              <div class="locale-menu">
                <div
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  class="locale-item"
                  @click="changeLocale(locale.code)"
                  :class="{ active: currentLocale === locale.code }"
                >
                  <span class="locale-flag">{{ locale.flag }}</span>
                  <span class="locale-name">{{ locale.name }}</span>
                </div>
              </div>
            </div>
            <ClientOnly>
              <div @click="toggleTheme" class="theme-toggle">
                {{ isDarkTheme ? '🌞' : '🌙' }}
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject, Ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ClientOnly from '@duannx/vue-client-only';
import GitHubLogin from './GitHubLogin.vue';
import githubMark from '../assets/github-mark.svg';
import githubMarkWhite from '../assets/github-mark-white.svg';
import type { AuthStore } from '../utils/useAuthStore';
import { useI18n } from 'vue-i18n';
import { availableLocales } from '../utils/i18n';

const { t } = useI18n();

// 定义 props
const props = defineProps<{
  changeTheme?: (isDark: boolean) => void;
}>();

const githubIcon = [githubMark, githubMarkWhite];

const isDarkTheme = inject<Ref<boolean>>('isDarkTheme', ref(false));
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

const authStore = inject<AuthStore>('authStore')!;
const isAuth = computed(() => authStore.isAuth.value);
const userInfo = computed(() => authStore.userInfo.value);

onMounted(async () => {
  await authStore.checkAuthStatus();
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

// 修改退出登录处理函数
const handleLogout = async () => {
  authStore.clearAuth();
  router.push('/');
};

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const getCurrentLocaleInfo = computed(
  () =>
    availableLocales.find((l) => l.code === locale.value) ||
    availableLocales[0],
);

const changeLocale = (code: string) => {
  locale.value = code;
};

// 添加导航到用户信息页面的方法
const navigateToUserInfo = () => {
  router.push(`/userInfo/${userInfo.value.login}`);
};
</script>

<style lang="less" scoped>
.navbar-container {
  top: 0;
  position: sticky;
  z-index: 1000;
  width: 80vw;
  max-width: 1600px;
  display: flex;
  justify-content: center;
  margin: 0 auto;

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

    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding: 0 1rem;
    }
  }
}

.logo-container {
  display: flex;
  align-items: center;
  cursor: pointer;

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
}

.search-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;

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

    &:focus {
      box-shadow:
        0 0 0 2px var(--border-color),
        0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &::placeholder {
      color: var(--text-color);
      opacity: 0.5;
    }
  }
}

.right-container {
  display: flex;
  align-items: center;

  .login-container {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }
}

.nav-item {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  margin-right: 10px;

  &:hover {
    background-color: var(--hover-bg-color);
  }
}

.theme-toggle {
  box-sizing: border-box;
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

  &:hover {
    background-color: var(--hover-bg-color);
    box-shadow: 0 2px 4px var(--shadow-color);
  }
}

.avatar-dropdown {
  position: relative;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  &:hover .dropdown-menu {
    display: block;
    animation: dropdownFadeIn 0.2s ease-out;
  }

  .github-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    top: calc(100%+10px);
    right: 50%;
    transform: translateX(50%);
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: 0 8px 32px var(--shadow-color);
    z-index: 1000;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 8px solid transparent;
    }

    &::before {
      border-bottom-color: var(--border-color);
      margin-bottom: 0;
    }

    &::after {
      border-bottom-color: var(--bg-color);
      margin-bottom: -1px;
    }
  }
}

.user-info {
  padding: 16px;
  font-weight: 600;
  color: var(--text-color);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.divider {
  height: 1px;
  background-color: var(--border-color);
  margin: 0;
}

.menu-item {
  padding: 12px 16px;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: var(--hover-bg-color);
  }

  &:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
}

.locale-dropdown {
  position: relative;
  margin-right: 10px;

  &:hover .locale-menu {
    display: block;
    animation: dropdownFadeIn 0.2s ease-out;
  }

  .locale-toggle {
    box-sizing: border-box;
    background: none;
    border: 1px solid var(--border-color);
    font-size: 1rem;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: all 0.3s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);

    &:hover {
      background-color: var(--hover-bg-color);
      box-shadow: 0 2px 4px var(--shadow-color);
    }
  }

  .locale-menu {
    display: none;
    position: absolute;
    top: calc(100% + 10px);
    right: 50%;
    transform: translateX(50%);
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: 0 8px 32px var(--shadow-color);
    z-index: 1000;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 8px solid transparent;
    }

    &::before {
      border-bottom-color: var(--border-color);
      margin-bottom: 0;
    }

    &::after {
      border-bottom-color: var(--bg-color);
      margin-bottom: -1px;
    }
  }
}

.locale-item {
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  color: var(--text-color);

  &:hover {
    background-color: var(--hover-bg-color);
  }

  &.active {
    background-color: var(--hover-bg-color);
    font-weight: 500;
  }

  .locale-flag {
    font-size: 1.2rem;
  }

  .locale-name {
    font-size: 0.9rem;
  }

  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translate(50%, -8px);
  }
  to {
    opacity: 1;
    transform: translate(50%, 0);
  }
}
</style>
