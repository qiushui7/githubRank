<template>
  <div class="recommend-container">
    <div class="header">
      <div class="title-section">
        <h1 class="title">Trending</h1>
        <p class="subtitle">
          These are the developers building the hot tools today.
        </p>
      </div>
      <div class="filter-section">
        <select v-model="selectedPeriod" class="period-filter">
          <option value="daily">Today</option>
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
        </select>
      </div>
    </div>

    <!-- 替换原来的loading为骨架屏 -->
    <div v-if="isLoading" class="developers-grid">
      <ClientOnly>
        <div v-for="n in 10" :key="n" class="developer-card skeleton-card">
          <div class="card-content">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-info">
              <div class="skeleton-name"></div>
              <div class="skeleton-username"></div>
              <div class="skeleton-bio"></div>
              <div class="skeleton-followers"></div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>

    <div v-else class="developers-grid">
      <div v-for="dev in developers" :key="dev.id" class="developer-card">
        <div class="card-content">
          <div class="avatar-container">
            <img :src="dev.avatar" :alt="dev.name" class="avatar" />
          </div>

          <div class="info">
            <h3 class="dev-name">{{ dev.name }}</h3>
            <div class="username-container">
              <span class="country-flag">{{ dev.countryCode }}</span>
              <a
                :href="`https://github.com/${dev.username}`"
                target="_blank"
                class="github-username"
              >
                @{{ dev.username }}
              </a>
            </div>
            <p class="bio">{{ dev.bio }}</p>
            <div class="followers">
              关注者: {{ dev.followers.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClientOnly from '@duannx/vue-client-only';
import { ref, onMounted, watch } from 'vue';

interface Developer {
  id: number;
  name: string;
  username: string;
  avatar: string;
  country: string;
  countryCode: string;
  bio: string;
  followers: number;
}

const developers = ref<Developer[]>([]);
const isLoading = ref(true);

const selectedPeriod = ref('daily');

const mockDevelopers: Developer[] = [
  {
    id: 1,
    name: '尤雨溪',
    username: 'yyx990803',
    avatar: 'https://avatars.githubusercontent.com/u/499550',
    country: '美国',
    countryCode: 'US',
    bio: 'Vue.js 创始人',
    followers: 78500,
  },
  {
    id: 2,
    name: '尤雨溪',
    username: 'yyx990803',
    avatar: 'https://avatars.githubusercontent.com/u/499550',
    country: '美国',
    countryCode: 'US',
    bio: 'Vue.js 创始人',
    followers: 78500,
  },
  {
    id: 3,
    name: '尤雨溪',
    username: 'yyx990803',
    avatar: 'https://avatars.githubusercontent.com/u/499550',
    country: '美国',
    countryCode: 'US',
    bio: 'Vue.js 创始人',
    followers: 78500,
  },
  {
    id: 4,
    name: '尤雨溪',
    username: 'yyx990803',
    avatar: 'https://avatars.githubusercontent.com/u/499550',
    country: '美国',
    countryCode: 'US',
    bio: 'Vue.js 创始人',
    followers: 78500,
  },
  {
    id: 5,
    name: '尤雨溪',
    username: 'yyx990803',
    avatar: 'https://avatars.githubusercontent.com/u/499550',
    country: '美国',
    countryCode: 'US',
    bio: 'Vue.js 创始人',
    followers: 78500,
  },
  {
    id: 6,
    name: '尤雨溪',
    username: 'yyx990803',
    avatar: 'https://avatars.githubusercontent.com/u/499550',
    country: '美国',
    countryCode: 'US',
    bio: 'Vue.js 创始人',
    followers: 78500,
  },
  {
    id: 7,
    name: '尤雨溪',
    username: 'yyx990803',
    avatar: 'https://avatars.githubusercontent.com/u/499550',
    country: '美国',
    countryCode: 'US',
    bio: 'Vue.js 创始人',
    followers: 78500,
  },
  {
    id: 8,
    name: '尤雨溪',
    username: 'yyx990803',
    avatar: 'https://avatars.githubusercontent.com/u/499550',
    country: '美国',
    countryCode: 'US',
    bio: 'Vue.js 创始人',
    followers: 78500,
  },
  {
    id: 9,
    name: '尤雨溪',
    username: 'yyx990803',
    avatar: 'https://avatars.githubusercontent.com/u/499550',
    country: '美国',
    countryCode: 'US',
    bio: 'Vue.js 创始人',
    followers: 78500,
  },
  {
    id: 10,
    name: '尤雨溪',
    username: 'yyx990803',
    avatar: 'https://avatars.githubusercontent.com/u/499550',
    country: '美国',
    countryCode: 'US',
    bio: 'Vue.js 创始人',
    followers: 78500,
  },
  {
    id: 11,
    name: '尤雨溪',
    username: 'yyx990803',
    avatar: 'https://avatars.githubusercontent.com/u/499550',
    country: '美国',
    countryCode: 'US',
    bio: 'Vue.js 创始人',
    followers: 78500,
  },
  // 可以添加更多开发者数据
];

const fetchDevelopers = async () => {
  isLoading.value = true;
  try {
    // 实际项目中这里应该根据 selectedPeriod.value 调用API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    developers.value = mockDevelopers;
  } finally {
    isLoading.value = false;
  }
};

watch(selectedPeriod, () => {
  fetchDevelopers();
});

onMounted(() => {
  fetchDevelopers();
});
</script>

<style scoped>
.recommend-container {
  padding: 0 0 2rem 0;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  /* 将绿色渐变改为蓝色渐变 */
  background: linear-gradient(
    141.27deg,
    #ff904e -4.24%,
    #ff5982 21.25%,
    #ec68f4 44.33%,
    #79e2ff 83.46%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.2rem;
  background: linear-gradient(
    141.27deg,
    #ff904e -4.24%,
    #ff5982 21.25%,
    #ec68f4 44.33%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.developers-grid {
  display: grid;
  /* 修改网格列数为固定4列，每列宽度相等 */
  grid-template-columns: repeat(5, 270px);
  gap: 2rem;
  /* 添加以下属性使网格居中 */
  justify-content: center;
}

.developer-card {
  box-sizing: border-box;
  width: 270px;
  height: 300px;
  background: var(--bg-color);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.developer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.avatar-container {
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #2196f3; /* 从 #42b883 改为 #2196F3 */
}

.avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
}

.info {
  text-align: center;
}

.dev-name {
  font-size: 1.25rem;
  margin: 0.5rem 0;
  color: var(--color-text);
}

.username-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.country-flag {
  font-size: 1.2rem;
}

.github-username {
  color: #2196f3; /* 从 #42b883 改为 #2196F3 */
  text-decoration: none;
  font-size: 0.9rem;
}

.github-username:hover {
  text-decoration: underline;
}

.bio {
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin: 0.5rem 0;
}

.followers {
  font-size: 0.8rem;
  color: var(--color-text-light);
  margin-top: 0.5rem;
}

.skeleton-card {
  position: relative;
  overflow: hidden;
}

.skeleton-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: var(--skeleton-bg-color);
}

.skeleton-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}

.skeleton-name {
  width: 150px;
  height: 24px;
  background: var(--skeleton-bg-color);
  border-radius: 4px;
}

.skeleton-username {
  width: 120px;
  height: 18px;
  background: var(--skeleton-bg-color);
  border-radius: 4px;
}

.skeleton-bio {
  width: 200px;
  height: 16px;
  background: var(--skeleton-bg-color);
  border-radius: 4px;
}

.skeleton-followers {
  width: 100px;
  height: 16px;
  background: var(--skeleton-bg-color);
  border-radius: 4px;
}

/* 添加闪光动画效果 */
.skeleton-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: var(--skeleton-shadow-color);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* 可以删除原来的loading-spinner相关样式 */

@media (max-width: 1200px) {
  .developers-grid {
    grid-template-columns: repeat(3, 270px);
  }
}

@media (max-width: 900px) {
  .developers-grid {
    grid-template-columns: repeat(2, 270px);
  }
}

@media (max-width: 600px) {
  .developers-grid {
    grid-template-columns: repeat(1, 270px);
  }

  .recommend-container {
    padding: 1rem;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.title-section {
  text-align: left;
}

.filter-section {
  margin-left: 2rem;
}

.period-filter {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--color-text);
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
}

.period-filter:hover {
  border-color: #2196f3;
}

@media (max-width: 600px) {
  .header {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
  }

  .title-section {
    text-align: center;
  }

  .filter-section {
    margin-left: 0;
  }
}
</style>
