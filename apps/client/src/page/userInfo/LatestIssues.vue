<template>
  <div class="issues-container">
    <table>
      <thead>
        <tr>
          <th>Repo</th>
          <th>Title</th>
          <th>State</th>
          <th>Created by</th>
          <th>Created at</th>
          <th>Latest update</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">
          <tr v-for="n in 10" :key="n" class="skeleton-row">
            <td><div class="skeleton repo-skeleton"></div></td>
            <td><div class="skeleton title-skeleton"></div></td>
            <td><div class="skeleton state-skeleton"></div></td>
            <td><div class="skeleton user-skeleton"></div></td>
            <td><div class="skeleton"></div></td>
            <td><div class="skeleton"></div></td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="issue in issuesList" :key="issue.issue_url">
            <td class="repo-name">{{ issue.repo_name }}</td>
            <td class="issue-title">
              <a
                :href="issue.issue_url"
                target="_blank"
                rel="noopener noreferrer"
                class="issue-link"
              >
                {{ issue.issue_title }}
              </a>
            </td>
            <td>
              <span
                class="state-tag"
                :class="{ closed: issue.state === 'closed' }"
              >
                {{ issue.state }}
              </span>
            </td>
            <td>
              <div class="user-info">
                <div
                  class="user-avatar-wrapper"
                  @click="navigateToUser(issue.user.login)"
                >
                  <img
                    :src="issue.user.avatar_url"
                    :alt="issue.user.login"
                    class="user-avatar"
                  />
                </div>
                <span>{{ issue.user.login }}</span>
              </div>
            </td>
            <td>{{ formatDate(issue.created_at) }}</td>
            <td>{{ formatDistance(issue.update_at) }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { formatDate, formatDistance } from '../../utils/timeFormat';
import { useRouter } from 'vue-router';
import { getUserIssues } from '../../service/userInfo';

const router = useRouter();

interface Issue {
  issue_url: string;
  issue_title: string;
  state: 'open' | 'closed';
  created_at: string;
  update_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  repo_name: string;
}

const props = defineProps<{
  github_id: string;
}>();

const isLoading = ref(true);
const issuesList = ref<Issue[]>([]);

onBeforeMount(async () => {
  const res = await getUserIssues(props.github_id);
  issuesList.value = res.data;
  isLoading.value = false;
});

const navigateToUser = (username: string) => {
  router.push(`/userInfo/${username}`);
};
</script>

<style scoped lang="less">
.issues-container {
  width: 100%;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;

    thead {
      position: sticky;
      top: 0;
      z-index: 1;

      tr {
        background: var(--bg-color);

        th {
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: var(--text-color);
          border-bottom: 2px solid var(--border-color);
          white-space: nowrap;
          background: var(--hover-bg-color);

          &:first-child {
            padding-left: 24px;
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px;
          }

          &:last-child {
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
          }
        }
      }
    }

    tbody {
      tr {
        transition: all 0.3s ease;

        &:hover {
          background: var(--hover-bg-color);
        }

        td {
          padding: 16px;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-color);

          &:first-child {
            padding-left: 24px;
          }
        }
      }
    }
  }

  .repo-name {
    color: #2196f3;
    font-weight: 500;
  }

  .issue-title {
    max-width: 400px;

    .issue-link {
      color: #2196f3;
      text-decoration: none;
      transition: all 0.2s ease;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;

      &:hover {
        color: #1976d2;
        text-decoration: underline;
      }

      // 添加外部链接图标
      &::after {
        content: '↗';
        font-size: 0.85em;
        margin-left: 4px;
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      &:hover::after {
        opacity: 1;
      }
    }
  }

  .state-tag {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.85rem;
    background: #2ecc71;
    color: white;

    &.closed {
      background: #e74c3c;
    }
  }

  .user-info {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 8px;

    .user-avatar-wrapper {
      cursor: pointer;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.1);
      }

      .user-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
    }
  }
}

// 骨架屏样式
.skeleton {
  height: 16px;
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

  &.repo-skeleton {
    width: 120px;
  }

  &.title-skeleton {
    width: 300px;
  }

  &.state-skeleton {
    width: 60px;
  }

  &.user-skeleton {
    width: 100px;
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

// 响应式滚动条
.issues-container {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
    border: 2px solid transparent;
    background-clip: padding-box;

    &:hover {
      background: #2196f3;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
  }
}
</style>
