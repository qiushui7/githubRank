<template>
  <div class="user-profile">
    <div class="profile-card">
      <!-- Loading 状态 -->
      <template v-if="loading">
        <div class="avatar-section">
          <div class="skeleton avatar-skeleton"></div>
        </div>
        <div class="basic-info">
          <div class="skeleton name-skeleton"></div>
          <div class="skeleton username-skeleton"></div>
          <div class="skeleton location-skeleton"></div>
          <div class="skeleton bio-skeleton"></div>

          <div class="stats-section">
            <div class="stat-item">
              <div class="skeleton stat-skeleton"></div>
              <div class="skeleton label-skeleton"></div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="skeleton stat-skeleton"></div>
              <div class="skeleton label-skeleton"></div>
            </div>
          </div>

          <div class="score-section">
            <div class="skeleton score-label-skeleton"></div>
            <div class="skeleton score-value-skeleton"></div>
          </div>
        </div>
      </template>

      <!-- 实际内容 -->
      <template v-else>
        <div class="avatar-section">
          <ClientOnly>
            <img
              :src="userInfo?.avatar_url || defaultAvatar"
              :alt="userInfo?.login || 'User'"
              class="avatar"
              @error="handleImageError"
            />
          </ClientOnly>
        </div>
        <div class="basic-info">
          <h2 class="name">
            {{ userInfo?.name || userInfo?.login || 'Unknown User' }}
          </h2>
          <a
            v-if="userInfo?.login"
            :href="`https://github.com/${userInfo.login}`"
            target="_blank"
            class="username"
          >
            @{{ userInfo.login }}
          </a>
          <div
            v-if="userInfo?.location || userInfo?.country_code"
            class="location"
          >
            <span v-if="userInfo.country_code" class="country-flag">
              {{ userInfo.country_code }}
            </span>
            {{ userInfo.location }}
          </div>
          <p v-if="userInfo?.bio" class="bio">{{ userInfo.bio }}</p>
          <p v-else class="bio empty">This user has no bio</p>

          <div class="stats-section">
            <div class="stat-item">
              <div class="stat-value">
                {{ formatNumber(userInfo?.totalStars ?? 0) }}
              </div>
              <div class="stat-label">Stars</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-value">
                {{ formatNumber(userInfo?.followers ?? 0) }}
              </div>
              <div class="stat-label">Followers</div>
            </div>
          </div>

          <div class="score-section">
            <div class="score-label">开发者评分</div>
            <div class="score-value">
              {{ (userInfo?.score ?? 0).toFixed(1) }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClientOnly from '@duannx/vue-client-only';

interface UserInfo {
  name?: string;
  login?: string;
  avatar_url?: string;
  country_code?: string;
  location?: string;
  bio?: string;
  score?: number;
  totalStars?: number;
  followers?: number;
}

const props = withDefaults(
  defineProps<{
    userInfo: UserInfo;
    loading?: boolean;
  }>(),
  {
    userInfo: () => ({}),
  },
);

const defaultAvatar =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="%23ccc" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/%3E%3C/svg%3E';

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = defaultAvatar;
};

const formatNumber = (num: number): string => {
  try {
    return num.toLocaleString();
  } catch (error) {
    console.error('Error formatting number:', error);
    return '0';
  }
};
</script>

<style scoped lang="less">
.user-profile {
  width: 300px;
  flex-shrink: 0;

  .profile-card {
    box-sizing: border-box;
    height: 100%;
    background: var(--bg-color);
    border-radius: 1rem;
    padding: 1.5rem;
    border: 1px solid var(--border-color);

    .avatar-section {
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .avatar {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 3px solid #2196f3;
        object-fit: cover;
        display: block;
      }
    }

    .basic-info {
      text-align: center;

      .name {
        font-size: 1.5rem;
        margin: 0.5rem 0;
        color: var(--text-color);
      }

      .username {
        color: #2196f3; /* 从 #42b883 改为 #2196F3 */
        text-decoration: none;
        font-size: 1rem;
        position: relative;
        z-index: 1;
      }

      .location {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        color: var(--text-color);
      }

      .bio {
        color: var(--text-color);
        margin: 1rem 0;

        &.empty {
          opacity: 0.6;
          font-style: italic;
        }
      }

      .stats-section {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1.5rem 0;
        padding: 1rem 0;
        border-top: 1px solid var(--border-color);
        border-bottom: 1px solid var(--border-color);

        .stat-item {
          flex: 1;
          text-align: center;

          .stat-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--text-color);
          }

          .stat-label {
            font-size: 0.9rem;
            color: var(--text-color);
            opacity: 0.8;
            margin-top: 0.25rem;
          }
        }

        .stat-divider {
          width: 1px;
          height: 2.5rem;
          background-color: var(--border-color);
          margin: 0 1rem;
        }
      }

      .score-section {
        margin-top: 1.5rem;

        .score-label {
          font-size: 0.9rem;
          color: var(--text-color);
        }

        .score-value {
          font-size: 2rem;
          font-weight: bold;
          color: #2196f3;
          margin-top: 0.5rem;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .user-profile {
    width: 100%;
  }
}

// 骨架屏样式
.skeleton {
  background: var(--skeleton-bg-color);
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
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
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.avatar-skeleton {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
}

.name-skeleton {
  height: 28px;
  width: 150px;
  margin: 0.5rem auto;
}

.username-skeleton {
  height: 20px;
  width: 120px;
  margin: 0.5rem auto;
}

.location-skeleton {
  height: 20px;
  width: 140px;
  margin: 1rem auto;
}

.bio-skeleton {
  height: 60px;
  width: 90%;
  margin: 1rem auto;
}

.stat-skeleton {
  height: 24px;
  width: 60px;
  margin: 0 auto;
}

.label-skeleton {
  height: 16px;
  width: 40px;
  margin: 0.25rem auto 0;
}

.score-label-skeleton {
  height: 16px;
  width: 80px;
  margin: 0 auto;
}

.score-value-skeleton {
  height: 32px;
  width: 100px;
  margin: 0.5rem auto 0;
}
</style>
