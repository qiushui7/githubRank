<template>
  <div class="callback-container">
    <div class="loading-card">
      <div class="loading-icon">
        <svg class="spinner" viewBox="0 0 50 50">
          <circle
            class="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="4"
          ></circle>
        </svg>
      </div>
      <div class="loading-text">{{ t('auth.processing') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { AuthStore } from '../utils/useAuthStore';
import {
  getUserInfo,
  getUserRepositories,
  getUserTechStack,
} from '../service/userInfo';

const { t } = useI18n();
const router = useRouter();
const authStore = inject<AuthStore>('authStore')!;

onMounted(async () => {
  try {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      const response = await fetch('/api/auth/github/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();

      if (data.access_token) {
        const userInfo = data.user;
        userInfo.access_token = data.access_token;
        await authStore.updateAuth(userInfo);
        requestIdleCallback(async () => {
          if (authStore.isAuth) {
            getUserInfo(authStore.userInfo.value.login);
            getUserRepositories(authStore.userInfo.value.login);
            const res = await getUserTechStack(authStore.userInfo.value.login);
            authStore.updateTechStack(res.data.techs);
          }
        });
        router.push('/');
      }
    }
  } catch (error) {
    console.error('GitHub callback error:', error);
    router.push('/');
  }
});
</script>

<style scoped lang="less">
.callback-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color);
}

.loading-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 8px 32px var(--shadow-color);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.loading-icon {
  width: 48px;
  height: 48px;
}

.spinner {
  animation: rotate 2s linear infinite;
  width: 100%;
  height: 100%;

  .path {
    stroke: #2196f3;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}

.loading-text {
  color: var(--text-color);
  font-size: 1.1rem;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
