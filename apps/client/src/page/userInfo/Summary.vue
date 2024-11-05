<template>
  <div class="summary-container">
    <!-- Loading 状态 -->
    <div v-if="loading" class="summary-loading">
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line" style="width: 80%"></div>
      <div class="skeleton-line" style="width: 90%"></div>
      <div class="skeleton-line" style="width: 75%"></div>
    </div>

    <!-- 内容展示 -->
    <div v-else class="summary-content">
      <div class="summary-header">
        <div class="icon">🤖</div>
        <div class="title">{{ t('summary.title') }}</div>
      </div>

      <div class="summary-card">
        <div class="quote-marks">❝</div>
        <div class="text-content">
          {{ content }}
        </div>
        <div class="quote-marks end">❞</div>
      </div>

      <div class="generated-time">
        {{ t('summary.generated_at') }} {{ formatDate(generatedTime) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formatDate } from '../../utils/timeFormat';
import { getUserSummary } from '../../service/userInfo';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const route = useRoute();
const loading = ref(true);
const content = ref('');
const chineseContent = ref('');
const generatedTime = new Date();

// 处理乱码的函数
const decodeUnicode = (str: string): string => {
  try {
    // 处理 Unicode 转义序列
    return str
      .replace(/\\u[\dA-F]{4}/gi, (match) => {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
      })
      .replace(/\\n/g, '\n') // 处理换行符
      .replace(/\\/g, '') // 处理多余的反斜杠
      .replace(/\"\[/g, '[') // 处理数组开始的引号
      .replace(/\]\"/g, ']'); // 处理数组结束的引号
  } catch (error) {
    console.error('Failed to decode unicode:', error);
    return str;
  }
};

const requestSummary = async () => {
  try {
    loading.value = true;
    const response = await getUserSummary(route.params.id as string);

    // 处理可能的乱码
    if (typeof response.data.summary === 'string') {
      content.value = decodeUnicode(response.data.summary);
    } else {
      content.value = JSON.stringify(response.data.summary);
    }
  } catch (error) {
    console.error('Failed to fetch user summary:', error);
    content.value = 'Failed to load summary.';
  } finally {
    loading.value = false;
  }
};

// const translateToZh = async (text: string) => {
//   try {
//     const response = await fetch('https://libretranslate.de/translate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         q: text,
//         source: 'en',
//         target: 'zh',
//       }),
//     });
//     const data = await response.json();
//     return data.translatedText;
//   } catch (error) {
//     console.error('Translation failed:', error);
//     return text;
//   }
// };

requestSummary();
</script>

<style scoped lang="less">
.summary-container {
  box-sizing: border-box;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

// Loading 状态样式
.summary-loading {
  padding: 2rem;

  .skeleton-line {
    height: 24px;
    background: var(--skeleton-bg-color);
    border-radius: 12px;
    margin-bottom: 1rem;
    width: 100%;
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
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

// 内容样式
.summary-content {
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  gap: 1.5rem;

  .summary-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      font-size: 1.5rem;
    }

    .title {
      font-size: 1.2rem;
      font-weight: 500;
      color: var(--text-color);
    }
  }

  .summary-card {
    background: var(--hover-bg-color);
    border-radius: 16px;
    padding: 2rem;
    position: relative;
    border: 1px solid var(--border-color);

    .quote-marks {
      font-size: 3rem;
      color: var(--text-color);
      opacity: 0.1;
      position: absolute;
      top: 1rem;
      left: 1rem;

      &.end {
        top: auto;
        left: auto;
        bottom: 1rem;
        right: 1rem;
      }
    }

    .text-content {
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--text-color);
      text-align: justify;
      position: relative;
      z-index: 1;
    }
  }

  .generated-time {
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.6;
    text-align: right;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .summary-container {
    padding: 0.5rem;
  }

  .summary-content {
    .summary-card {
      padding: 1.5rem;

      .text-content {
        font-size: 1rem;
      }
    }
  }
}
</style>
