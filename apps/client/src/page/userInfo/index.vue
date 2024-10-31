<template>
  <div class="user-info-container">
    <!-- 左侧用户基本信息 -->
    <UserProfile :user-info="userInfo" />

    <!-- 右侧内容区域 -->
    <div class="content-section">
      <!-- 导航栏 -->
      <UserInfoNavbar v-model="currentTab" />

      <!-- 内容展示区域 -->
      <div class="tab-content">
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import UserProfile from './UserProfile.vue';
import UserInfoNavbar from './UserInfoNavbar.vue';
import Rankings from './Rankings.vue';
import Summary from './Summary.vue';
import Score from './Score.vue';
import Repositories from './Repositories.vue';
// import LatestIssues from './LatestIssues.vue';
// 模拟用户数据
const userInfo = ref({
  name: '尤雨溪',
  login: 'yyx990803',
  avatar_url: 'https://avatars.githubusercontent.com/u/499550',
  country_code: 'US',
  location: '美国',
  bio: 'Vue.js 创始人',
  score: 9.8,
  totalStars: 15904,
  followers: 101745,
});

// 更新默认标签页
const currentTab = ref('Rankings');

const currentComponent = computed(() => {
  const components = {
    Rankings,
    Summary,
    Score,
    Repositories,
  };
  return components[currentTab.value as keyof typeof components];
});
</script>

<style scoped lang="less">
.user-info-container {
  display: flex;
  height: 80vh;
  gap: 2rem;
  min-height: calc(100vh - 140px);
  color: var(--text-color);
  .content-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .tab-content {
      background: var(--bg-color);
      border-radius: 1rem;
      padding: 1.5rem;
      border: 1px solid var(--border-color);
      flex: 1;
      overflow: scroll;
      overflow-x: hidden;
    }
  }
}

@media screen and (max-width: 768px) {
  .user-info-container {
    flex-direction: column;
    padding: 1rem;
  }
}
</style>
