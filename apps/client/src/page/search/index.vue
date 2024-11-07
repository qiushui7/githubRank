<template>
  <div class="search-container">
    <div class="search-header">
      <h1 class="title">搜索结果: "{{ keyword }}"</h1>
      <div class="filter-section">
        <select v-model="selectedCountry" class="country-filter">
          <option value="">{{ t('search.all') }}</option>
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
      <div v-if="!isLoading">
        <div v-if="developers.length" class="developers-list">
          <!-- 开发者卡片列表 -->
          <div v-for="dev in developers" :key="dev.id" class="developer-card">
            <!-- 添加卡片背景 logo -->
            <div class="card-background-logo">
              <svg
                viewBox="0 0 16 16"
                width="100%"
                height="100%"
                fill="currentColor"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
            </div>
            <div class="card-content">
              <div class="left-section">
                <div
                  class="avatar-container"
                  @click="navigateToUserInfo(dev.user_info.login)"
                >
                  <img
                    :src="dev.user_info.avatar_url"
                    :alt="dev.user_info.name"
                    class="avatar"
                  />
                </div>
                <div class="basic-info">
                  <h3 class="dev-name">{{ dev.user_info.name }}</h3>
                  <div class="username-container">
                    <a
                      :href="dev.user_info.html_url"
                      target="_blank"
                      class="github-username"
                    >
                      @{{ dev.user_info.login }}
                    </a>
                  </div>
                  <div class="location" v-if="dev.user_info.location">
                    <i class="location-icon">📍</i>
                    {{ dev.user_info.location }}
                  </div>
                </div>
              </div>

              <div class="center-section">
                <div class="bio-section">
                  <div v-if="dev.user_info.bio" class="bio">
                    {{ dev.user_info.bio }}
                  </div>
                  <div v-else class="bio empty-bio">This user has no bio</div>
                </div>
                <div class="user-links">
                  <a
                    v-if="dev.user_info.blog"
                    :href="dev.user_info.blog"
                    target="_blank"
                    class="link"
                  >
                    <i class="link-icon">🔗</i> Blog
                  </a>
                  <a
                    v-if="dev.user_info.email"
                    :href="`mailto:${dev.user_info.email}`"
                    class="link"
                  >
                    <i class="link-icon">📧</i> Email
                  </a>
                </div>
                <div class="stats-grid">
                  <div class="stat-item">
                    <div class="stat-label">Repositories</div>
                    <div class="stat-value">
                      {{ dev.user_info.public_repos }}
                    </div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-label">Followers</div>
                    <div class="stat-value">{{ dev.user_info.followers }}</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-label">Following</div>
                    <div class="stat-value">{{ dev.user_info.following }}</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-label">Gists</div>
                    <div class="stat-value">
                      {{ dev.user_info.public_gists }}
                    </div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-label">Created</div>
                    <div class="stat-value">
                      {{ formatDate(dev.user_info.created_at) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 加载更多 -->
          <div ref="loadingRef" class="loading-more" v-if="hasMore">
            <div v-if="isLoadingMore" class="loading-spinner">
              <div class="spinner"></div>
              <span>加载中...</span>
            </div>
          </div>

          <!-- 全部加载完毕 -->
          <div v-else class="no-more">
            <span>已经到底啦 ~</span>
          </div>
        </div>
      </div>
      <div v-else class="no-results">
        <p>没有找到相关开发者</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import countries from 'i18n-iso-countries';
import zhLocale from 'i18n-iso-countries/langs/zh.json';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { useI18n } from 'vue-i18n';
import { searchDevelopers, SearchParams } from '../../service/search';
import { AuthStore } from '../../utils/useAuthStore';
import { formatDate } from '../../utils/timeFormat';

interface Developer {
  user_info: {
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
  };
}

interface Country {
  code: string;
  name: string;
}

const { t, locale } = useI18n();

countries.registerLocale(zhLocale);
countries.registerLocale(enLocale);

// 获取中文国家列表
const zhCountryObj = countries.getNames('zh');
const enCountryObj = countries.getNames('en');

const authStore = inject<AuthStore>('authStore')!;

const currentPage = ref(1);
const pageSize = 5; // 每页显示5条数据
const route = useRoute();
const keyword = computed(() => route.query.keyword as string);
const isLoading = ref(true);
const isLoadingMore = ref(false);
const hasMore = ref(true);
const loadingRef = ref<HTMLElement | null>(null);
const developers = ref<Developer[]>([]);
const selectedCountry = ref('');

const availableCountries = computed(() => {
  const countryObj = locale.value === 'zh' ? zhCountryObj : enCountryObj;
  return Object.entries(countryObj).map(([code, name]) => ({
    code,
    name,
  }));
});

const requestSearchDevelopers = async (isLoadMore = false) => {
  if (!isLoadMore) {
    isLoading.value = true;
  } else {
    isLoadingMore.value = true;
  }

  try {
    const query = route.query.keyword as string;
    let nation = '';
    if (!selectedCountry.value) {
      nation = '';
    } else {
      nation = enCountryObj[selectedCountry.value as string];
    }
    const data: SearchParams = {
      target_language: '',
      nation,
      techs: [...authStore.techStack.value],
    };
    const res = await searchDevelopers(
      query,
      pageSize,
      currentPage.value,
      data,
    );

    if (isLoadMore) {
      developers.value = [...developers.value, ...res.data.result];
    } else {
      developers.value = res.data.result;
    }

    hasMore.value = res.data.result.length === pageSize;
  } finally {
    if (isLoadMore) {
      isLoadingMore.value = false;
    } else {
      isLoading.value = false;
    }
  }
};

// 使用原生 Intersection Observer
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoadingMore.value && hasMore.value) {
        currentPage.value++;
        requestSearchDevelopers(true);
      }
    },
    {
      threshold: 0.5,
    },
  );

  if (loadingRef.value) {
    observer.observe(loadingRef.value);
  }

  // 组件卸载时清理
  onUnmounted(() => {
    observer.disconnect();
  });
});

// 监听搜索条件变化
watch([() => route.query.keyword, selectedCountry], () => {
  if (typeof window === 'undefined') return;
  currentPage.value = 1;
  hasMore.value = true;
  requestSearchDevelopers();
});

if (typeof window !== 'undefined') {
  requestSearchDevelopers();
}

const router = useRouter();

const navigateToUserInfo = (username: string) => {
  router.push(`/userInfo/${username}`);
};
</script>

<style scoped lang="less">
.search-container {
  max-width: 1600px;
  width: 80vw;
  margin: 0 auto;
  position: relative; // 添加相对定位
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
  color: var(--text-color);
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
  position: relative; // 添加相对定位
  overflow: hidden; // 确保 logo 不会超出卡片

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .card-background-logo {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 150px;
    height: 150px;
    opacity: 0.03;
    color: var(--text-color);
    pointer-events: none;
    z-index: 0;
    transform: rotate(-15deg);
  }

  .card-content {
    position: relative;
    z-index: 1;
  }
}

.card-content {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;

  .left-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    min-width: 200px;

    .avatar-container {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid #2196f3;
      cursor: pointer; // 添加指针样式
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 15px rgba(33, 150, 243, 0.3);

        .avatar {
          transform: scale(1.1);
        }
      }

      .avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }

    .basic-info {
      text-align: center;
      width: 100%;

      .dev-name {
        font-size: 1.4rem;
        margin: 0;
        color: var(--text-color);
        word-break: break-word;
      }

      .github-username {
        color: #2196f3;
        text-decoration: none;
        font-size: 1rem;
        display: inline-block;
        margin-top: 0.5rem;

        &:hover {
          text-decoration: underline;
        }
      }

      .location {
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: var(--text-color);
        opacity: 0.8;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
      }
    }
  }

  .center-section {
    flex: 1;
    display: flex;
    flex-direction: column;

    .bio-section {
      min-height: 60px;
      display: flex;
      align-items: flex-start;
      margin-bottom: 1rem;

      .bio {
        font-size: 1rem;
        line-height: 1.6;
        color: var(--text-color);
        white-space: pre-line;
        width: 100%;
        text-align: left;

        &.empty-bio {
          color: var(--text-color);
          opacity: 0.5;
          font-style: italic;
          display: flex;
          align-items: center;
          height: 60px;
        }
      }
    }

    .user-links {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      min-height: 24px;

      .link {
        color: #2196f3;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.9rem;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);

      .stat-item {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .stat-label {
          font-size: 1rem;
          color: var(--text-color);
          opacity: 0.7;
          margin-bottom: 0.3rem;
          width: 100%;
          text-align: center;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-color);
          width: 100%;
          text-align: center;
        }
      }
    }
  }
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
  color: var(--text-color);
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
  color: var(--text-color);
}

.stat-value {
  font-size: 0.9rem;
  color: var(--text-color);
  font-weight: 500;
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

.loading-more {
  padding: 2rem 0;
  text-align: center;
  color: var(--text-color);
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-top-color: #2196f3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.no-more {
  text-align: center;
  padding: 2rem 0;
  color: var(--text-color);
  opacity: 0.6;
  font-size: 0.9rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
