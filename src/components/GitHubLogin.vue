<template>
  <button @click="login" class="github-login-button">
    使用 GitHub 登录
  </button>
</template>

<script setup lang="ts">
const clientId = 'Ov23lif8NCAnEoCNns7Q';
const redirectUri = 'http://localhost:5173/auth/github/callback';

function login() {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
  window.location.href = githubAuthUrl;
}
</script>

<style scoped>
.github-login-button {
  color: var(--text-color);
  background: none;
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.github-login-button:hover {
  background-color: var(--hover-bg-color);
  color: var(--text-color);
}
</style>
