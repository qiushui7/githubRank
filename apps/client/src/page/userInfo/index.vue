<template>
  <div class="user-info-container">
    <!-- 左侧用户基本信息 -->
    <UserProfile
      :user-info="userInfo"
      :total-stars="totalStars"
      :loading="isLoading"
    />

    <!-- 右侧内容区域 -->
    <div class="content-section">
      <!-- 导航栏 -->
      <UserInfoNavbar v-model="currentTab" />

      <!-- 内容展示区域 -->
      <div class="tab-content">
        <keep-alive>
          <component
            :is="currentComponent"
            :key="currentTab"
            :github_id="github_id"
            @update:totalStars="updateTotalStars"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject, onBeforeMount } from 'vue';
import UserProfile from './UserProfile.vue';
import UserInfoNavbar from './components/UserInfoNavbar.vue';
import Rankings from './Rankings.vue';
import Summary from './Summary.vue';
import Score from './Score.vue';
import Repositories from './Repositories.vue';
import LatestIssues from './LatestIssues.vue';
import { useRoute, useRouter } from 'vue-router';
import { getUserInfo, guessNation } from '../../service/userInfo';
import type { PreloadStore } from '../../utils/preload';

interface UserInfo {
  name: string;
  login: string;
  avatar_url: string;
  country_code: string;
  location: string;
  bio: string;
  score: number;
  totalStars: number;
  followers: number;
}

// 用户数据
const userInfo = ref<UserInfo>({} as UserInfo);
const route = useRoute();
const router = useRouter();
const github_id = computed(() => route.params.id as string);
const isLoading = ref(false);
const totalStars = ref(0);
const preloadStore = inject<PreloadStore>('preloadStore')!;

const requestUserInfo = async () => {
  try {
    isLoading.value = true;
    const res = await getUserInfo(github_id.value);
    userInfo.value = res.data;

    if (!userInfo.value.location || userInfo.value.location === 'undefined') {
      userInfo.value.location = 'guessing...';
      await requestGuessNation();
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  } finally {
    isLoading.value = false;
  }
};

// 监听路由参数变化
watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId && newId !== oldId) {
      router.go(0);
    }
  },
);

const requestGuessNation = async () => {
  try {
    userInfo.value.location = 'guessing...';
    const guessRes = await guessNation(github_id.value);
    userInfo.value.location = guessRes.data.guess_nation;
  } catch (error) {
    userInfo.value.location = 'unknown';
    console.error('Failed to guess nation:', error);
  }
};

if (
  preloadStore.state[github_id.value] &&
  Object.keys(preloadStore.state[github_id.value].userInfo).length
) {
  userInfo.value = preloadStore.state[github_id.value].userInfo as UserInfo;
  isLoading.value = false;
}

onBeforeMount(async () => {
  if (
    !preloadStore.state[github_id.value] ||
    Object.keys(preloadStore.state[github_id.value].userInfo).length === 0
  ) {
    requestUserInfo();
  } else if (
    userInfo.value.location == 'undefined' ||
    !userInfo.value.location
  ) {
    requestGuessNation();
  }
});

// 更新默认标签页
const currentTab = ref('Rankings');

const currentComponent = computed(() => {
  const components = {
    Rankings,
    Summary,
    Score,
    Repositories,
    LatestIssues,
  } as const;
  return components[currentTab.value as keyof typeof components];
});

const updateTotalStars = (stars: number) => {
  totalStars.value = stars;
};
</script>

<style scoped lang="less">
.user-info-container {
  display: flex;
  height: 80vh;
  min-height: 800px;
  gap: 2rem;
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
      overflow: auto;
      overflow-x: hidden;

      // 自定义滚动条样式
      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
        margin: 0;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 3px;
        border: 2px solid transparent;
        background-clip: padding-box;
        transition: all 0.3s ease;

        &:hover {
          background: #2196f3;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
      }

      // Firefox 滚动条样式
      scrollbar-width: thin;
      scrollbar-color: var(--border-color) transparent;

      // 滚动条容器圆角
      &::-webkit-scrollbar-corner {
        background: transparent;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .user-info-container {
    flex-direction: column;
    padding: 1rem;
    height: 100%;
  }
}
</style>
