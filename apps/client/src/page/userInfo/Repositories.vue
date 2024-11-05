<template>
  <div class="repositories-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Language</th>
          <th>Created at</th>
          <th>Updated at</th>
          <th>Issues</th>
          <th>Forks</th>
          <th>Stars</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        <!-- 加载状态显示骨架屏 -->
        <template v-if="isLoading">
          <tr v-for="n in 10" :key="n" class="skeleton-row">
            <td><div class="skeleton name-skeleton"></div></td>
            <td><div class="skeleton lang-skeleton"></div></td>
            <td><div class="skeleton"></div></td>
            <td><div class="skeleton"></div></td>
            <td><div class="skeleton"></div></td>
            <td><div class="skeleton"></div></td>
            <td><div class="skeleton"></div></td>
            <td><div class="skeleton"></div></td>
          </tr>
        </template>
        <!-- 实际数据 -->
        <template v-else>
          <tr v-for="item in RepositoriesList" :key="item.name">
            <td class="repo-name">
              <a
                :href="item.html_url"
                target="_blank"
                rel="noopener noreferrer"
                class="repo-link"
              >
                {{ item.name }}
              </a>
            </td>
            <td>
              <span v-if="item['language']" class="language-tag">{{
                item['language']
              }}</span>
            </td>
            <td>{{ formatDate(item['created_at']) }}</td>
            <td>{{ formatDistance(item['updated_at']) }}</td>
            <td>{{ item['open_issues_count'] }}</td>
            <td>{{ item['forks_count'] }}</td>
            <td>{{ item['stargazers_count'] }}</td>
            <td>{{ formatSize(item['size']) }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onBeforeMount } from 'vue';
import { getUserRepositories } from '../../service/userInfo';
import { useRoute } from 'vue-router';
import type { Repository } from '../../types/repository';
import { formatDate, formatDistance } from '../../utils/timeFormat';
import type { PreloadStore } from '../../utils/preload';

const preloadStore = inject<PreloadStore>('preloadStore')!;

const RepositoriesList = ref<Repository[]>([]);
const isLoading = ref(true);
const github_id = useRoute().params.id as string;

// 格式化文件大小
const formatSize = (size: number): string => {
  if (size < 1024) {
    return `${size} KB`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} MB`;
  } else {
    return `${(size / (1024 * 1024)).toFixed(1)} GB`;
  }
};

const requestRepositories = async () => {
  try {
    isLoading.value = true;
    const res = await getUserRepositories(github_id);
    RepositoriesList.value = res.data;
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
  } finally {
    isLoading.value = false;
  }
};
if (
  preloadStore.state[github_id] &&
  preloadStore.state[github_id].repositories.length
) {
  RepositoriesList.value = preloadStore.state[github_id]
    .repositories as Repository[];
  isLoading.value = false;
}
onBeforeMount(() => {
  if (
    !preloadStore.state[github_id] ||
    preloadStore.state[github_id].repositories.length === 0
  ) {
    requestRepositories();
  }
});
</script>

<style scoped lang="less">
.repositories-container {
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

    // 表头样式
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

    // 表格内容
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

          // 仓库名称样式
          &.repo-name {
            font-weight: 500;

            .repo-link {
              color: #2196f3;
              text-decoration: none;
              transition: all 0.2s ease;
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
        }
      }
    }
  }
}

// 语言标签样式
.language-tag {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  background: var(--hover-bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

// 添加响应式滚动条样式
.repositories-container {
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

  &.name-skeleton {
    width: 150px;
  }

  &.lang-skeleton {
    width: 80px;
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.skeleton-row {
  td {
    padding: 16px;
    border-bottom: 1px solid var(--border-color);

    &:first-child {
      padding-left: 24px;
    }

    .skeleton {
      width: 100%;
      max-width: 120px;
    }
  }
}
</style>
