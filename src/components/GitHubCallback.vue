<template>
  <div>处理 GitHub 登录中...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    try {
      // 这里应该调用你的后端 API 来交换访问令牌
      const response = await axios.post('/api/github/callback', { code });
      const { access_token } = response.data;

      // 存储访问令牌（注意：在实际应用中，你可能想使用更安全的存储方式）
      localStorage.setItem('github_token', access_token);

      // 重定向到主页或用户仪表板
      router.push('/');
    } catch (error) {
      console.error('GitHub 登录失败', error);
      // 处理错误，可能重定向到错误页面
      router.push('/login-error');
    }
  }
});
</script>
