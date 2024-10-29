<template>
  <div class="search-container">
    <div class="search-header">
      <h1 class="title">搜索结果: "{{ keyword }}"</h1>
      <div class="filter-section">
        <select v-model="selectedCountry" class="country-filter">
          <option value="">所有国家</option>
          <option
            v-for="country in availableCountries"
            :key="country.code"
            :value="country.code"
          >
            {{ country.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- 骨架屏 -->
    <div v-if="isLoading" class="developers-list">
      <div v-for="n in 5" :key="n" class="developer-card skeleton-card">
        <div class="card-content">
          <div class="left-section">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-basic-info">
              <div class="skeleton-name"></div>
              <div class="skeleton-username"></div>
            </div>
          </div>

          <div class="center-section">
            <div class="skeleton-bio"></div>
            <div class="skeleton-stats-grid">
              <div class="skeleton-stat-item">
                <div class="skeleton-stat-label"></div>
                <div class="skeleton-stat-value"></div>
              </div>
              <div class="skeleton-stat-item">
                <div class="skeleton-stat-label"></div>
                <div class="skeleton-stat-value"></div>
              </div>
              <div class="skeleton-stat-item">
                <div class="skeleton-stat-label"></div>
                <div class="skeleton-stat-value"></div>
              </div>
              <div class="skeleton-stat-item">
                <div class="skeleton-stat-label"></div>
                <div class="skeleton-stat-value"></div>
              </div>
              <div class="skeleton-stat-item">
                <div class="skeleton-stat-label"></div>
                <div class="skeleton-stat-value"></div>
              </div>
            </div>
          </div>

          <div class="right-section">
            <div class="skeleton-stats">
              <div class="skeleton-followers-count"></div>
              <div class="skeleton-followers-label"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div v-else>
      <div v-if="filteredDevelopers.length" class="developers-list">
        <div
          v-for="dev in paginatedDevelopers"
          :key="dev.id"
          class="developer-card"
        >
          <div class="card-content">
            <div class="left-section">
              <div class="avatar-container">
                <img :src="dev.avatar" :alt="dev.name" class="avatar" />
              </div>
              <div class="basic-info">
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
              </div>
            </div>

            <div class="center-section">
              <p class="bio">{{ dev.bio }}</p>
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-label">主要语言</div>
                  <div class="stat-value">
                    <span
                      class="language-dot"
                      :style="{ background: dev.mainLanguageColor }"
                    ></span>
                    {{ dev.mainLanguage }}
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">获得 Star</div>
                  <div class="stat-value">
                    {{ dev.totalStars.toLocaleString() }}
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">被 Fork</div>
                  <div class="stat-value">
                    {{ dev.totalForks.toLocaleString() }}
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">总 Issue</div>
                  <div class="stat-value">
                    {{ dev.totalIssues.toLocaleString() }}
                  </div>
                </div>
                <div class="stat-item score">
                  <div class="stat-label">开发者评分</div>
                  <div class="stat-value score-value">
                    {{ dev.score.toFixed(1) }}
                  </div>
                </div>
              </div>
            </div>

            <div class="right-section">
              <div class="stats">
                <div class="followers-count">
                  {{ dev.followers.toLocaleString() }}
                </div>
                <div class="followers-label">关注者</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 使用分页器组件 -->
        <Pagination
          v-model:currentPage="currentPage"
          :total-pages="totalPages"
        />
      </div>
      <div v-else class="no-results">
        <p>没有找到相关开发者</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Pagination from '@/components/Pagination.vue';

interface Developer {
  id: number;
  name: string;
  username: string;
  avatar: string;
  country: string;
  countryCode: string;
  bio: string;
  followers: number;
  mainLanguage: string;
  mainLanguageColor: string;
  totalStars: number;
  totalForks: number;
  totalIssues: number;
  score: number;
}

interface Country {
  code: string;
  name: string;
}

const route = useRoute();
const keyword = computed(() => route.query.keyword as string);
const isLoading = ref(true);
const developers = ref<Developer[]>([]);
const selectedCountry = ref('');

// 模拟的国家数据
const availableCountries = ref<Country[]>([
  { code: 'CN', name: '中国' },
  { code: 'US', name: '美国' },
  { code: 'JP', name: '日本' },
  { code: 'UK', name: '英国' },
  { code: 'DE', name: '德国' },
]);

// 模拟搜索API调用
const searchDevelopers = async (query: string) => {
  isLoading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    developers.value = new Array(8).fill(null).map((item, index) => {
      return {
        id: index + 1,
        name: '尤雨溪',
        username: 'yyx990803',
        avatar: 'https://avatars.githubusercontent.com/u/499550',
        country: '美国',
        countryCode: 'US',
        bio: 'Vue.js 创始人',
        followers: 78500,
        mainLanguage: 'JavaScript',
        mainLanguageColor: '#f1e05a',
        totalStars: 156800,
        totalForks: 28900,
        totalIssues: 12500,
        score: 9.8,
      };
    });
  } finally {
    isLoading.value = false;
  }
};

// 根据国家筛选开发者
const filteredDevelopers = computed(() => {
  if (!selectedCountry.value) return developers.value;
  return developers.value.filter(
    (dev) => dev.countryCode === selectedCountry.value,
  );
});

// 监听路由参数变化
watch(
  () => route.query.keyword,
  (newKeyword) => {
    if (newKeyword) {
      searchDevelopers(newKeyword as string);
    }
  },
  { immediate: true },
);

const currentPage = ref(1);
const pageSize = 5; // 每页显示5条数据

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredDevelopers.value.length / pageSize);
});

// 获取当前页的数据
const paginatedDevelopers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredDevelopers.value.slice(start, end);
});

// 监听筛选条件变化，重置页码
watch([selectedCountry, () => route.query.keyword], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.search-container {
  max-width: 1600px;
  margin: 0 auto;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.title {
  font-size: 1.8rem;
  background: linear-gradient(
    141.27deg,
    #ff904e -4.24%,
    #ff5982 21.25%,
    #ec68f4 44.33%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.country-filter {
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

.country-filter:hover {
  border-color: #2196f3;
}

.developers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem;
}

.developer-card {
  background: var(--bg-color);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
}

.developer-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-width: 280px;
}

.avatar-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #2196f3;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
}

.basic-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dev-name {
  font-size: 1.25rem;
  margin: 0;
  color: var(--color-text);
}

.username-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.country-flag {
  font-size: 1.2rem;
}

.github-username {
  color: #2196f3;
  text-decoration: none;
  font-size: 0.9rem;
}

.github-username:hover {
  text-decoration: underline;
}

.center-section {
  flex: 1;
  padding: 0 1rem;
}

.bio {
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin: 0;
  line-height: 1.5;
}

.right-section {
  min-width: 120px;
  text-align: center;
}

.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.followers-count {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text);
}

.followers-label {
  font-size: 0.8rem;
  color: var(--color-text-light);
}

/* 骨架屏样式 */
.skeleton-card {
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  background: var(--bg-color);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}

.skeleton-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--skeleton-bg-color);
  border: 3px solid var(--border-color);
}

.skeleton-basic-info {
  display: flex;
  flex-direction: column;
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
  width: 100%;
  height: 0.9rem;
  background: var(--skeleton-bg-color);
  border-radius: 4px;
}

.skeleton-stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.skeleton-stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.skeleton-stat-label {
  width: 60px;
  height: 14px;
  background: var(--skeleton-bg-color);
  border-radius: 4px;
}

.skeleton-stat-value {
  width: 80px;
  height: 18px;
  background: var(--skeleton-bg-color);
  border-radius: 4px;
}

.skeleton-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.skeleton-followers-count {
  width: 80px;
  height: 28px;
  background: var(--skeleton-bg-color);
  border-radius: 4px;
}

.skeleton-followers-label {
  width: 60px;
  height: 16px;
  background: var(--skeleton-bg-color);
  border-radius: 4px;
}

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

.no-results {
  text-align: center;
  padding: 3rem;
  color: var(--color-text);
  font-size: 1.2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--color-text-light);
}

.stat-value {
  font-size: 0.9rem;
  color: var(--color-text);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.language-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.score {
  text-align: right;
}

.score-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2196f3;
  justify-content: flex-end;
}

/* 更新骨架屏样式 */
.skeleton-card .center-section {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.skeleton-stat {
  height: 40px;
  background: var(--skeleton-bg-color);
  border-radius: 4px;
}

@media (max-width: 1200px) {
  .search-header {
    flex-direction: column;
    gap: 1rem;
  }

  .card-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .left-section {
    width: 100%;
  }

  .center-section {
    width: 100%;
    padding: 0;
  }

  .right-section {
    width: 100%;
  }

  .stats {
    flex-direction: row;
    justify-content: flex-start;
    gap: 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .score {
    grid-column: span 3;
    text-align: center;
  }

  .score-value {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .score {
    grid-column: span 2;
  }
}
</style>
