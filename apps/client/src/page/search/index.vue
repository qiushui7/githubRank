<template>
  <div class="rank-list-container" :class="{ 'dark-theme': isDarkTheme }">
    <div class="filters glass-effect">
      <select v-model="selectedRegion" class="glass-select">
        <option value="">所有地区</option>
        <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
      </select>
      <select v-model="selectedLanguage" class="glass-select">
        <option value="">所有语言</option>
        <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
      </select>
    </div>

    <div class="table-container glass-effect">
      <table class="rank-table">
        <thead>
          <tr>
            <th>排名</th>
            <th>头像</th>
            <th>昵称</th>
            <th>地区</th>
            <th>关注者</th>
            <th>最常用语言</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td><img :src="user.avatar_url" :alt="user.login" class="user-avatar"></td>
            <td>{{ user.login }}</td>
            <td>{{ user.location }}</td>
            <td>{{ user.followers }}</td>
            <td>{{ user.top_language }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface User {
  id: number;
  login: string;
  avatar_url: string;
  location: string;
  top_language: string;
  followers: number;
}

const users = ref<User[]>([]);
const selectedRegion = ref('');
const selectedLanguage = ref('');
const isDarkTheme = ref(false);

const regions = computed(() => [...new Set(users.value.map(user => user.location))]);
const languages = computed(() => [...new Set(users.value.map(user => user.top_language))]);

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const regionMatch = !selectedRegion.value || user.location === selectedRegion.value;
    const languageMatch = !selectedLanguage.value || user.top_language === selectedLanguage.value;
    return regionMatch && languageMatch;
  });
});

onMounted(async () => {
  // 这里应该调用API获取用户数据
  // 示例数据：
  users.value = [
    { id: 1, login: 'user1', avatar_url: 'https://example.com/avatar1.jpg', location: '中国', top_language: 'JavaScript', followers: 1000 },
    { id: 2, login: 'user2', avatar_url: 'https://example.com/avatar2.jpg', location: '美国', top_language: 'Python', followers: 2000 },
    // ... 更多用户数据
  ];

  // 获取主题设置
  const theme = localStorage.getItem('theme') === 'true';
  isDarkTheme.value = theme;
  document.body.classList.toggle('dark-theme', theme);
});
</script>

<style scoped>
.rank-list-container {
  max-width: 1600px;
  margin: 20px auto 0;
  color: var(--text-color);
}

.glass-effect {
  background: var(--bg-color);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  box-shadow: 0 8px 32px var(--shadow-color);
}

.filters {
  margin-bottom: 20px;
  padding: 17.5px;
  display: flex;
  justify-content: center;
}

.glass-select {
  margin: 0 10px;
  padding: 12px;
  background: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease;
  font-size: 16px;
}

.glass-select:focus {
  box-shadow: 0 0 0 2px var(--border-color);
}

.table-container {
  width: 80vw;
  overflow-x: auto;
  padding: 10px; /* 减少表格容器的内边距 */
}

.rank-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.rank-table th, .rank-table td {
  padding: 15px; /* 稍微减少单元格的内边距 */
  text-align: left;
  border-bottom: 1px solid var(--border-color);
  font-size: 16px; /* 稍微减小字体小 */
}

.rank-table th {
  background-color: var(--bg-color);
  font-weight: bold;
}

.rank-table tr:hover {
  background-color: var(--hover-bg-color);
}

.user-avatar {
  width: 50px; /* 稍微减小头像大小 */
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

/* 深色主题样式 */
:root {
  --bg-color: rgba(255, 255, 255, 0.7);
  --text-color: #333;
  --hover-bg-color: rgba(255, 255, 255, 0.9);
  --border-color: rgba(0, 0, 0, 0.1);
  --shadow-color: rgba(0, 0, 0, 0.1);
}

.dark-theme {
  --bg-color: rgba(0, 0, 0, 0.6);
  --text-color: #fff;
  --hover-bg-color: rgba(255, 255, 255, 0.1);
  --border-color: rgba(255, 255, 255, 0.1);
  --shadow-color: rgba(0, 0, 0, 0.4);
}
</style>
