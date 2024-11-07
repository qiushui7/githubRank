<template>
  <div class="rankings-container">
    <!-- Loading 状态 -->
    <template v-if="isLoading">
      <div class="total-section">
        <div v-for="n in 4" :key="n" class="total-item skeleton">
          <div class="skeleton-title"></div>
          <div class="skeleton-value"></div>
        </div>
      </div>

      <div class="charts-section">
        <div class="charts-row">
          <div v-for="n in 2" :key="n" class="chart-container skeleton">
            <div class="skeleton-title"></div>
            <div class="skeleton-chart"></div>
          </div>
        </div>
        <div class="charts-row">
          <div v-for="n in 2" :key="n" class="chart-container skeleton">
            <div class="skeleton-title"></div>
            <div class="skeleton-chart"></div>
          </div>
        </div>
      </div>
    </template>

    <!-- 错误状态 -->
    <template v-else-if="error">
      <div class="error-state">
        <div class="error-icon">❌</div>
        <div class="error-message">{{ error }}</div>
        <button class="retry-button" @click="retryLoad">重试</button>
      </div>
    </template>

    <!-- 空状态 -->
    <template v-else-if="!hasData">
      <div class="empty-state">
        <div class="empty-icon">📊</div>
        <div class="empty-message">暂无统计数据</div>
      </div>
    </template>

    <!-- 正常内容 -->
    <template v-else>
      <!-- 总览数据 -->
      <div class="total-section">
        <div class="total-item" v-for="(value, key) in totalData" :key="key">
          <div class="total-title">{{ key }}</div>
          <div class="total-value">{{ formatNumber(value) }}</div>
        </div>
      </div>

      <!-- 排名图表 -->
      <ClientOnly>
        <div class="charts-section">
          <div class="charts-row">
            <div class="chart-container languages-chart">
              <div class="chart-title">Main Languages</div>
              <v-chart class="chart" :option="languagesOption" />
            </div>
            <div class="chart-container">
              <div class="chart-title">Issues Ranking</div>
              <v-chart class="chart" :option="issuesOption" />
            </div>
          </div>
          <div class="charts-row">
            <div class="chart-container">
              <div class="chart-title">Forks Ranking</div>
              <v-chart class="chart" :option="forksOption" />
            </div>
            <div class="chart-container">
              <div class="chart-title">Stars Ranking</div>
              <v-chart class="chart" :option="starsOption" />
            </div>
          </div>
        </div>
      </ClientOnly>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  inject,
  computed,
  Ref,
  defineAsyncComponent,
  watch,
  onMounted,
} from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import ClientOnly from '@duannx/vue-client-only';
import { fetchTopLanguages } from '../../service/github';
import { getUserRepositories } from '../../service/userInfo';
import { useRoute } from 'vue-router';
import type { Repository } from '../../types/repository';
import type { PreloadStore } from '../../utils/preload';

const preloadStore = inject<PreloadStore>('preloadStore')!;

const props = defineProps<{
  github_id: string;
}>();

const RepositoriesList = ref<Repository[]>([]);
const repo_pushed = computed(() => {
  return RepositoriesList.value.filter(
    (d) => d.pushed_at > d.created_at,
  ) as Repository[];
});

interface LanguageItem {
  name: string;
  size: number;
  color: string;
  count: number;
}

const requestRepositories = async () => {
  if (
    preloadStore.state[props.github_id] &&
    preloadStore.state[props.github_id].repositories.length
  ) {
    RepositoriesList.value = preloadStore.state[props.github_id]
      .repositories as Repository[];
  } else {
    try {
      const res = await getUserRepositories(props.github_id);
      RepositoriesList.value = res.data;
      preloadStore.state[props.github_id] = { repositories: res.data };
    } catch (err) {
      console.log(err);
      error.value = '加载失败，请重试';
      throw err;
    }
  }
};

const VChart = defineAsyncComponent(() =>
  import('vue-echarts').then((mod) => {
    if (typeof window !== 'undefined') {
      return mod;
    }
    return { render: () => null };
  }),
);

// 注册必要的组件
if (import.meta.env.SSR === false) {
  use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
  ]);
}

const github_id = computed(() => useRoute().params.id);
const getTopLanguages = async () => {
  const res = await fetchTopLanguages(github_id.value as string);
  languagesData.value = Object.values(res);
};
if (typeof window !== 'undefined') {
  getTopLanguages();
}

const isDarkTheme = inject<Ref<boolean>>('isDarkTheme', ref(false));
// 总览数据
const totalData = computed(() => {
  return {
    'Pushed to repos': repo_pushed.value.length,
    'Used languages': languagesData.value?.length || 0,
    'Total issues': totalIssues.value,
    'Total forks': totalForks.value,
  };
});

const repoRanking = (property: keyof Repository) => {
  return RepositoriesList.value
    .filter((d) => d[property])
    .sort((a, b) => (b[property] as number) - (a[property] as number));
};

const issuesRanking = computed(() => repoRanking('open_issues_count'));
const forksRanking = computed(() => repoRanking('forks_count'));
const starsRanking = computed(() => repoRanking('stargazers_count'));

const totalIssues = computed(() =>
  issuesRanking.value.reduce((acc, curr) => acc + curr.open_issues_count, 0),
);
const totalForks = computed(() =>
  forksRanking.value.reduce((acc, curr) => acc + curr.forks_count, 0),
);
const totalStars = computed(() =>
  starsRanking.value.reduce((acc, curr) => acc + curr.stargazers_count, 0),
);

const formatNumber = (value: number) => {
  return value.toLocaleString();
};
// 根据主题计算颜色
const themeColors = computed(() => ({
  textColor: isDarkTheme.value ? '#ffffff' : '#000000',
  borderColor: isDarkTheme.value ? '#ffffff20' : '#00000020',
}));

// 通用图表配置
const commonChartConfig = computed(() => ({
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      color: themeColors.value.textColor,
    },
    axisLine: {
      lineStyle: {
        color: themeColors.value.borderColor,
      },
    },
    splitLine: {
      lineStyle: {
        color: themeColors.value.borderColor,
      },
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: themeColors.value.textColor,
    },
    axisLine: {
      lineStyle: {
        color: themeColors.value.borderColor,
      },
    },
    splitLine: {
      lineStyle: {
        color: themeColors.value.borderColor,
      },
    },
  },
}));

const languagesData = ref<LanguageItem[]>([]);
// 语言统计图表配置
const languagesOption = computed(() => {
  const hasLanguages = languagesData.value?.length > 0;

  return {
    ...commonChartConfig.value,
    xAxis: {
      ...commonChartConfig.value.xAxis,
      data: hasLanguages
        ? languagesData.value.slice(0, 10).map((item) => item.name)
        : ['暂无数据'],
    },
    series: [
      {
        data: hasLanguages
          ? languagesData.value.slice(0, 10).map((item) => {
              const totalSize = languagesData.value.reduce(
                (acc, curr) => acc + curr.size,
                0,
              );
              return ((item.size / totalSize) * 100).toFixed(2);
            })
          : [0],
        type: 'bar',
        itemStyle: {
          color: '#2196f3',
        },
      },
    ],
    graphic: !hasLanguages
      ? [
          {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
              text: '暂无语言数据',
              fill: themeColors.value.textColor,
              fontSize: 14,
              opacity: 0.5,
            },
          },
        ]
      : undefined,
  };
});

// Issues 排名图表配置
const issuesOption = computed(() => {
  const hasIssues = issuesRanking.value.some((d) => d.open_issues_count > 0);

  return {
    ...commonChartConfig.value,
    xAxis: {
      ...commonChartConfig.value.xAxis,
      data: hasIssues
        ? issuesRanking.value.slice(0, 10).map((d) => d.name)
        : ['暂无数据'],
    },
    series: [
      {
        data: hasIssues
          ? issuesRanking.value.slice(0, 10).map((d) => d.open_issues_count)
          : [0],
        type: 'bar',
        itemStyle: {
          color: '#2196f3',
        },
      },
    ],
    graphic: !hasIssues
      ? [
          {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
              text: '暂无 Issues 数据',
              fill: themeColors.value.textColor,
              fontSize: 14,
              opacity: 0.5,
            },
          },
        ]
      : undefined,
  };
});

// Forks 排名图表配置
const forksOption = computed(() => {
  const hasForks = forksRanking.value.some((d) => d.forks_count > 0);

  return {
    ...commonChartConfig.value,
    xAxis: {
      ...commonChartConfig.value.xAxis,
      data: hasForks
        ? forksRanking.value.slice(0, 10).map((d) => d.name)
        : ['暂无数据'],
    },
    series: [
      {
        data: hasForks
          ? forksRanking.value.slice(0, 10).map((d) => d.forks_count)
          : [0],
        type: 'bar',
        itemStyle: {
          color: '#2196f3',
        },
      },
    ],
    graphic: !hasForks
      ? [
          {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
              text: '暂无 Forks 数据',
              fill: themeColors.value.textColor,
              fontSize: 14,
              opacity: 0.5,
            },
          },
        ]
      : undefined,
  };
});

// Stars 排名图表配置
const starsOption = computed(() => {
  const hasStars = starsRanking.value.some((d) => d.stargazers_count > 0);

  return {
    ...commonChartConfig.value,
    xAxis: {
      ...commonChartConfig.value.xAxis,
      data: hasStars
        ? starsRanking.value.slice(0, 10).map((d) => d.name)
        : ['暂无数据'],
    },
    series: [
      {
        data: hasStars
          ? starsRanking.value.slice(0, 10).map((d) => d.stargazers_count)
          : [0],
        type: 'bar',
        itemStyle: {
          color: '#2196f3',
        },
      },
    ],
    graphic: !hasStars
      ? [
          {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
              text: '暂无 Stars 数据',
              fill: themeColors.value.textColor,
              fontSize: 14,
              opacity: 0.5,
            },
          },
        ]
      : undefined,
  };
});

const emit = defineEmits<{
  (e: 'update:totalStars', value: number): void;
}>();

// 监听 totalStars 的变化
watch(
  totalStars,
  (newValue) => {
    emit('update:totalStars', newValue);
  },
  {
    immediate: true,
  },
);

const isLoading = ref(true);
const error = ref<string | null>(null);

const retryLoad = async () => {
  try {
    error.value = null;
    isLoading.value = true;
    await requestRepositories();
  } catch (err) {
    error.value = '加载失败，请重试';
  } finally {
    isLoading.value = false;
  }
};

// 初始化加载
onMounted(async () => {
  if (!RepositoriesList.value.length) {
    await retryLoad();
  } else {
    isLoading.value = false;
  }
});

const hasData = computed(() => {
  const hasRepos = RepositoriesList.value.length > 0;
  const hasLanguages = languagesData.value?.length > 0;
  const hasStars = starsRanking.value.some((d) => d.stargazers_count > 0);
  const hasForks = forksRanking.value.some((d) => d.forks_count > 0);
  const hasIssues = issuesRanking.value.some((d) => d.open_issues_count > 0);

  return hasRepos || hasLanguages || hasStars || hasForks || hasIssues;
});
</script>

<style scoped lang="less">
.rankings-container {
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .total-section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    .total-item {
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;

      .total-title {
        color: var(--text-color);
        font-size: 1rem;
        margin-bottom: 0.5rem;
        opacity: 0.8;
      }

      .total-value {
        color: var(--text-color);
        font-size: 1.8rem;
        font-weight: bold;
      }
    }
  }

  .charts-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .charts-row {
      display: flex;
      gap: 2rem;
      height: calc((100vh - 400px) / 2);
      min-height: 300px;

      .chart-container {
        flex: 1;
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;

        .chart-title {
          color: var(--text-color);
          font-size: 1.1rem;
          margin-bottom: 1rem;
          text-align: center;
          font-weight: 500;
        }

        .chart {
          flex: 1;
          min-height: 0;
        }
      }

      .languages-chart {
        .chart {
          padding: 1rem;
        }
      }
    }
  }
}

// 响应式设计
@media screen and (max-width: 1200px) {
  .rankings-container {
    .total-section {
      grid-template-columns: repeat(2, 1fr);
    }

    .charts-section {
      .charts-row {
        flex-direction: column;
        height: auto;

        .chart-container {
          height: 400px;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .rankings-container {
    .total-section {
      grid-template-columns: 1fr;
    }
  }
}

// 骨架屏样式
.skeleton {
  position: relative;
  overflow: hidden;

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

  .skeleton-title {
    height: 20px;
    width: 60%;
    background: var(--skeleton-bg-color);
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .skeleton-value {
    height: 32px;
    width: 80%;
    background: var(--skeleton-bg-color);
    border-radius: 4px;
  }

  .skeleton-chart {
    height: 100%;
    background: var(--skeleton-bg-color);
    border-radius: 8px;
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

// 错误状态样式
.error-state {
  height: calc(100vh - 400px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-color);

  .error-icon,
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    opacity: 0.5;
  }

  .error-message,
  .empty-message {
    font-size: 1.2rem;
    opacity: 0.7;
    margin-bottom: 1rem;
  }
}

// 空状态样式
.empty-state {
  height: calc(100vh - 400px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-color);

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    opacity: 0.5;
  }

  .empty-message {
    font-size: 1.2rem;
    opacity: 0.7;
    margin-bottom: 1rem;
  }
}

.retry-button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #2196f3;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1976d2;
  }
}
</style>
