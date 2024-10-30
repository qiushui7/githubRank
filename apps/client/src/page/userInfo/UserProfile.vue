<template>
  <div class="user-profile">
    <div class="profile-card">
      <div class="avatar-section">
        <img :src="userInfo.avatar_url" :alt="userInfo.login" class="avatar" />
      </div>
      <div class="basic-info">
        <h2 class="name">{{ userInfo.name }}</h2>
        <div class="username">@{{ userInfo.login }}</div>
        <div class="location">
          <span class="country-flag">{{ userInfo.country_code }}</span>
          {{ userInfo.location }}
        </div>
        <p class="bio">{{ userInfo.bio }}</p>

        <div class="stats-section">
          <div class="stat-item">
            <div class="stat-value">
              {{ formatNumber(userInfo.totalStars) }}
            </div>
            <div class="stat-label">Stars</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">{{ formatNumber(userInfo.followers) }}</div>
            <div class="stat-label">Followers</div>
          </div>
        </div>

        <div class="score-section">
          <div class="score-label">开发者评分</div>
          <div class="score-value">{{ userInfo.score.toFixed(1) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

defineProps<{
  userInfo: UserInfo;
}>();

const formatNumber = (num: number): string => {
  return num.toLocaleString();
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
        color: #2196f3;
        margin-bottom: 0.5rem;
      }

      .location {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        color: var(--text-color);
      }

      .bio {
        color: var(--text-color);
        margin: 1rem 0;
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
</style>
