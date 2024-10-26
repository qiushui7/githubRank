<template>
  <div>Processing GitHub login...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { setToken } from '../service/auth';

const router = useRouter();

onMounted(async () => {
  const code = new URLSearchParams(window.location.search).get('code');
  if (code) {
    try {
      const response = await fetch('/api/auth/github/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (data.access_token) {
        setToken(data.access_token);
        localStorage.setItem('user_info', JSON.stringify(data.user));
        router.push('/');
      } else {
        throw new Error('Failed to get access token');
      }
    } catch (error) {
      console.error('GitHub login error:', error);
      router.push('/login-error');
    }
  }
});
</script>
