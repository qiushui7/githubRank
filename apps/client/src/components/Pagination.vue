<template>
  <div class="pagination" v-if="totalPages > 1">
    <button
      class="page-btn"
      :disabled="currentPage === 1"
      @click="handlePageChange(currentPage - 1)"
    >
      上一页
    </button>

    <div class="page-numbers">
      <!-- 第一页 -->
      <button
        class="page-number"
        :class="{ active: currentPage === 1 }"
        @click="handlePageChange(1)"
      >
        1
      </button>

      <!-- 左省略号 -->
      <span v-if="showLeftEllipsis" class="ellipsis">...</span>

      <!-- 中间页码 -->
      <button
        v-for="page in middlePages"
        :key="page"
        class="page-number"
        :class="{ active: page === currentPage }"
        @click="handlePageChange(page)"
      >
        {{ page }}
      </button>

      <!-- 右省略号 -->
      <span v-if="showRightEllipsis" class="ellipsis">...</span>

      <!-- 最后一页 -->
      <button
        v-if="totalPages > 1"
        class="page-number"
        :class="{ active: currentPage === totalPages }"
        @click="handlePageChange(totalPages)"
      >
        {{ totalPages }}
      </button>
    </div>

    <button
      class="page-btn"
      :disabled="currentPage === totalPages"
      @click="handlePageChange(currentPage + 1)"
    >
      下一页
    </button>

    <!-- 跳转到指定页 -->
    <div class="page-jump">
      <span>跳至</span>
      <input
        type="number"
        v-model="jumpPage"
        :min="1"
        :max="totalPages"
        class="jump-input"
        @keyup.enter="handleJump"
      />
      <span>页</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void;
}>();

const jumpPage = ref('');

// 计算需要显示的中间页码
const middlePages = computed(() => {
  const current = props.currentPage;
  const total = props.totalPages;
  const delta = 2; // 当前页左右显示的页码数

  let start = Math.max(2, current - delta);
  let end = Math.min(total - 1, current + delta);

  // 调整start和end，确保显示固定数量的页码
  if (current - delta > 2) {
    start = current - delta;
  }
  if (current + delta < total - 1) {
    end = current + delta;
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// 是否显示左省略号
const showLeftEllipsis = computed(() => {
  return props.currentPage - 3 > 1;
});

// 是否显示右省略号
const showRightEllipsis = computed(() => {
  return props.currentPage + 3 < props.totalPages;
});

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page);
  }
};

const handleJump = () => {
  const page = parseInt(jumpPage.value);
  if (page && page >= 1 && page <= props.totalPages) {
    handlePageChange(page);
    jumpPage.value = '';
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
}

.page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn:not(:disabled):hover {
  border-color: #2196f3;
  color: #2196f3;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.page-number {
  min-width: 36px;
  height: 36px;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-number:hover {
  border-color: #2196f3;
  color: #2196f3;
}

.page-number.active {
  background: #2196f3;
  color: white;
  border-color: #2196f3;
}

.ellipsis {
  color: var(--text-color);
  padding: 0 0.5rem;
}

.page-jump {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
}

.jump-input {
  width: 50px;
  height: 36px;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: var(--bg-color);
  color: var(--text-color);
  text-align: center;
  outline: none;
  transition: all 0.3s ease;
}

.jump-input:focus {
  border-color: #2196f3;
}

/* 移除输入框的上下箭头 */
.jump-input::-webkit-inner-spin-button,
.jump-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.jump-input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}

@media (max-width: 768px) {
  .page-numbers {
    display: none;
  }

  .pagination {
    gap: 0.5rem;
  }

  .page-jump {
    display: none;
  }
}
</style>
