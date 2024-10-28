<template>
  <div class="recommend-container">
    <h1 class="title">Trending</h1>
    <p class="title" style="font-size: 1.2rem;">These are the developers building the hot tools today.</p>
    
    <!-- 替换原来的loading为骨架屏 -->
    <div v-if="isLoading" class="developers-grid">
      <ClientOnly>
        <div v-for="n in 10" 
            :key="n" 
            class="developer-card skeleton-card"
            :class="{ 'dark': isDarkTheme }">
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
      <div v-for="dev in developers" 
           :key="dev.id" 
           class="developer-card"
           :class="{ 'dark': isDarkTheme }">
        <div class="card-content">
          <div class="avatar-container">
            <img :src="dev.avatar" :alt="dev.name" class="avatar">
          </div>
          
          <div class="info">
            <h3 class="dev-name">{{ dev.name }}</h3>
            <div class="username-container">
              <span class="country-flag">{{ dev.countryCode }}</span>
              <a :href="`https://github.com/${dev.username}`" 
                 target="_blank" 
                 class="github-username">
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
import { ref, onMounted, Ref ,inject } from 'vue';

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

const isDarkTheme = inject<Ref<boolean>>('isDarkTheme');
const developers = ref<Developer[]>([]);
const isLoading = ref(true);

const mockDevelopers: Developer[] = [
  {
    id: 1,
    name: "尤雨溪",
    username: "yyx990803",
    avatar: "https://avatars.githubusercontent.com/u/499550",
    country: "美国",
    countryCode: "US",
    bio: "Vue.js 创始人",
    followers: 78500
  },
  {
    id: 2,
    name: "尤雨溪",
    username: "yyx990803",
    avatar: "https://avatars.githubusercontent.com/u/499550",
    country: "美国",
    countryCode: "US",
    bio: "Vue.js 创始人",
    followers: 78500
  },
  {
    id: 3,
    name: "尤雨溪",
    username: "yyx990803",
    avatar: "https://avatars.githubusercontent.com/u/499550",
    country: "美国",
    countryCode: "US",
    bio: "Vue.js 创始人",
    followers: 78500
  },
  {
    id: 4,
    name: "尤雨溪",
    username: "yyx990803",
    avatar: "https://avatars.githubusercontent.com/u/499550",
    country: "美国",
    countryCode: "US",
    bio: "Vue.js 创始人",
    followers: 78500
  },
  {
    id: 5,
    name: "尤雨溪",
    username: "yyx990803",
    avatar: "https://avatars.githubusercontent.com/u/499550",
    country: "美国",
    countryCode: "US",
    bio: "Vue.js 创始人",
    followers: 78500
  },
  {
    id: 6,
    name: "尤雨溪",
    username: "yyx990803",
    avatar: "https://avatars.githubusercontent.com/u/499550",
    country: "美国",
    countryCode: "US",
    bio: "Vue.js 创始人",
    followers: 78500
  },
  {
    id: 7,
    name: "尤雨溪",
    username: "yyx990803",
    avatar: "https://avatars.githubusercontent.com/u/499550",
    country: "美国",
    countryCode: "US",
    bio: "Vue.js 创始人",
    followers: 78500
  },
  {
    id: 8,
    name: "尤雨溪",
    username: "yyx990803",
    avatar: "https://avatars.githubusercontent.com/u/499550",
    country: "美国",
    countryCode: "US",
    bio: "Vue.js 创始人",
    followers: 78500
  },
  {
    id: 9,
    name: "尤雨溪",
    username: "yyx990803",
    avatar: "https://avatars.githubusercontent.com/u/499550",
    country: "美国",
    countryCode: "US",
    bio: "Vue.js 创始人",
    followers: 78500
  },
  {
    id: 10,
    name: "尤雨溪",
    username: "yyx990803",
    avatar: "https://avatars.githubusercontent.com/u/499550",
    country: "美国",
    countryCode: "US",
    bio: "Vue.js 创始人",
    followers: 78500
  },
  {
    id: 11,
    name: "尤雨溪",
    username: "yyx990803",
    avatar: "https://avatars.githubusercontent.com/u/499550",
    country: "美国",
    countryCode: "US",
    bio: "Vue.js 创始人",
    followers: 78500
  },
  // 可以添加更多开发者数据
];

const fetchDevelopers = async () => {
  // 实际项目中这里应该调用API
  // 现在使用模拟数据
  await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟加载
  developers.value = mockDevelopers;
  isLoading.value = false;
};


onMounted(() => {
  fetchDevelopers();
});
</script>

<style scoped>
.recommend-container {
  padding: 2rem 0;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  text-align: center;
  /* 将绿色渐变改为蓝色渐变 */
  background: linear-gradient(141.27deg, #ff904e -4.24%, #ff5982 21.25%, #ec68f4 44.33%, #79e2ff 83.46%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.developers-grid {
  margin-top: 60px;
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

.dark .developer-card {
  background: rgba(30, 30, 30, 0.5);
}

.avatar-container {
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #2196F3; /* 从 #42b883 改为 #2196F3 */
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
  color: #2196F3; /* 从 #42b883 改为 #2196F3 */
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
  background: #eee;
}

.dark .skeleton-avatar {
  background: #333;
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
  background: #eee;
  border-radius: 4px;
}

.skeleton-username {
  width: 120px;
  height: 18px;
  background: #eee;
  border-radius: 4px;
}

.skeleton-bio {
  width: 200px;
  height: 16px;
  background: #eee;
  border-radius: 4px;
}

.skeleton-followers {
  width: 100px;
  height: 16px;
  background: #eee;
  border-radius: 4px;
}

.dark .skeleton-name,
.dark .skeleton-username,
.dark .skeleton-bio,
.dark .skeleton-followers {
  background: #333;
}

/* 添加闪光动画效果 */
.skeleton-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

/* .dark .skeleton-card::after {
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.02) 20%,
    rgba(255, 255, 255, 0.05) 60%,
    rgba(255, 255, 255, 0)
  );
} */

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
</style>
