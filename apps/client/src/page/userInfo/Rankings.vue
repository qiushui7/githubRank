<template>
  <div class="rankings-container">
    <!-- 总览数据 -->
    <div class="total-section">
      <div class="total-item" v-for="(value, key) in totalData" :key="key">
        <div class="total-title">{{ key }}</div>
        <div class="total-value">{{ formatNumber(value) }}</div>
      </div>
    </div>

    <!-- 排名图表 -->
    <div class="charts-section">
      <div class="charts-row">
        <div class="chart-container languages-chart">
          <div class="chart-title">Languages</div>
          <v-chart class="chart" :option="languagesOption" autoresize />
        </div>
        <div class="chart-container">
          <div class="chart-title">Issues Ranking</div>
          <v-chart class="chart" :option="issuesOption" autoresize />
        </div>
      </div>
      <div class="charts-row">
        <div class="chart-container">
          <div class="chart-title">Forks Ranking</div>
          <v-chart class="chart" :option="forksOption" autoresize />
        </div>
        <div class="chart-container">
          <div class="chart-title">Stars Ranking</div>
          <v-chart class="chart" :option="starsOption" autoresize />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, Ref } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';

// 注册必要的组件
use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const isDarkTheme = inject<Ref<boolean>>('isDarkTheme', ref(false));
// 总览数据
const totalData = {
  'Pushed to repos': 92,
  'Main languages': 11,
  'Total issues': 192,
  'Total forks': 1707,
};
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

// 语言统计图表配置
const languagesOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    textStyle: {
      color: themeColors.value.textColor,
    },
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      label: {
        color: themeColors.value.textColor,
      },
      data: [
        { value: 40, name: 'JavaScript', itemStyle: { color: '#f1e05a' } },
        { value: 30, name: 'TypeScript', itemStyle: { color: '#3178c6' } },
        { value: 20, name: 'Vue', itemStyle: { color: '#41b883' } },
        { value: 10, name: 'HTML', itemStyle: { color: '#e34c26' } },
      ],
    },
  ],
}));

// Issues 排名图表配置
const issuesOption = computed(() => ({
  ...commonChartConfig.value,
  xAxis: {
    ...commonChartConfig.value.xAxis,
    data: ['Vue', 'React', 'Angular', 'Svelte'],
  },
  series: [
    {
      data: [53, 34, 25, 19],
      type: 'bar',
      itemStyle: {
        color: '#2196f3',
      },
    },
  ],
}));

// Forks 排名图表配置
const forksOption = computed(() => ({
  ...commonChartConfig.value,
  xAxis: {
    ...commonChartConfig.value.xAxis,
    data: ['Vue', 'Vite', 'VuePress', 'Vue-Router'],
  },
  series: [
    {
      data: [53, 42, 32, 24],
      type: 'bar',
      itemStyle: {
        color: '#2196f3',
      },
    },
  ],
}));

// Stars 排名图表配置
const starsOption = computed(() => ({
  ...commonChartConfig.value,
  xAxis: {
    ...commonChartConfig.value.xAxis,
    data: ['Vue.js', 'React', 'Angular', 'Svelte'],
  },
  series: [
    {
      data: [200, 150, 100, 50],
      type: 'bar',
      itemStyle: {
        color: '#2196f3',
      },
    },
  ],
}));
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
</style>
