<template>
  <div>Processing GitHub login...</div>
</template>

<script setup lang="ts">
import { onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import type { AuthStore } from '../utils/useAuthStore';
import { getUserInfo, getUserRepositories } from '../service/userInfo';

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
        requestIdleCallback(() => {
          if (authStore.isAuth) {
            getUserInfo(authStore.userInfo.value.login);
            getUserRepositories(authStore.userInfo.value.login);
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
