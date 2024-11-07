<template>
  <div class="score-container">
    <div class="score-container-header">
      <div class="score-container-header-left">
        <span class="score">{{ commentResponse.average }}</span
        ><br />
        <span
          >{{ commentResponse.total }} {{ t('comment.comment_count') }}</span
        >
      </div>
      <div class="score-container-header-right">
        <div
          v-for="item in scoreGroup"
          :key="item.score"
          class="score-container-header-right-item"
        >
          <StarRating
            v-model="item.score"
            :disabled="true"
            :show-score="false"
          />
          <ProgressBar
            :percentage="item.percentage"
            style="margin-left: 10px"
          />
        </div>
      </div>
    </div>
    <div class="score-container-content">
      <CommentBox
        :userInfo="userInfo"
        :isAuth="isAuth"
        :github_id="props.github_id"
        :comments="commentResponse.list"
        @handlePageChange="handlePageChange"
      />
      <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
    </div>
  </div>
</template>
<script setup lang="ts">
import StarRating from './components/StarRating.vue';
import ProgressBar from './components/ProgressBar.vue';
import CommentBox from './components/CommentBox.vue';
import { inject, computed, ref, watch } from 'vue';
import { getComments } from '../../service/comment';
import type { AuthStore } from '../../utils/useAuthStore';
import Pagination from '@/components/Pagination.vue';
import type { CommentResponse } from '../../types/comment.ts';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  github_id: string;
}>();

const authStore = inject<AuthStore>('authStore')!;
const isAuth = computed(() => authStore.isAuth.value);
const userInfo = computed(() => authStore.userInfo.value);
const commentResponse = ref<CommentResponse>({
  average: 0,
  count: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  list: [],
  total: 0,
} as CommentResponse);
const currentPage = ref(1);

const scoreGroup = computed(() => {
  return Object.entries(commentResponse.value?.count || {})
    .map(([score, count]) => ({
      score: parseInt(score),
      percentage: ((count as number) / commentResponse.value?.total) * 100,
    }))
    .reverse();
});

const totalPages = computed(() => {
  return Math.ceil(commentResponse.value?.total / 5);
});

const handlePageChange = async (page: number) => {
  currentPage.value = page;
  const res = await getComments(props.github_id, page);
  commentResponse.value = res.data;

  // 平滑滚动到顶部
  const contentElement = document.querySelector('.score-container-content');
  if (contentElement) {
    contentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

watch(
  currentPage,
  (newVal: number) => {
    handlePageChange(newVal);
  },
  { immediate: true },
);
</script>
<style scoped lang="less">
.score-container {
  height: 100%;
  width: 100%;
  .score-container-header {
    width: 100%;
    display: flex;
    align-items: center;
    .score-container-header-left {
      height: 100%;
      width: 30%;
      text-align: center;
      line-height: normal;
      .score {
        color: #2196f3;
        font-size: 60px;
        line-height: 80px;
      }
    }
    .score-container-header-right {
      flex: 1;
      .score-container-header-right-item {
        margin-top: 5px;
        display: flex;
        align-items: center;
      }
    }
  }
  .score-container-content {
    margin-top: 30px;
    height: 70%;
    width: 100%;
    overflow-y: auto; // 确保内容可滚动
    scroll-behavior: smooth; // 添加平滑滚动

    // 自定义滚动条样式
    &::-webkit-scrollbar {
      width: 6px;
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
      }
    }
  }
}
</style>
