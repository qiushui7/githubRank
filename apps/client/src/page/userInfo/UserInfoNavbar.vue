<template>
  <div class="nav-container">
    <div class="nav-list">
      <div
        v-for="item in navList"
        :key="item"
        class="nav-item"
        :class="{ active: modelValue === item }"
        @click="updateBar(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const navList = [
  'Rankings',
  'Summary',
  'Score',
  'Repositories',
  'LatestIssues',
];
const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const updateBar = (data: string) => {
  emit('update:modelValue', data);
};
</script>

<style scoped lang="less">
.nav-container {
  box-sizing: border-box;
  background: var(--bg-color);
  border-radius: 12px;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
  width: 100%;

  .nav-list {
    display: flex;
    padding: 0.5rem;
    overflow-x: auto;
    justify-content: space-between;
    gap: 0.5rem;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 2px;
    }

    .nav-item {
      flex: 1;
      min-width: fit-content;
      padding: 0.75rem 0.5rem;
      font-size: 0.95rem;
      color: var(--text-color);
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s ease;
      white-space: nowrap;
      text-align: center;

      &:hover {
        background: var(--hover-bg-color);
        transform: translateY(-1px);
      }

      &.active {
        background: #2196f3;
        color: white;
        font-weight: 500;
      }
    }
  }
}

@media (max-width: 768px) {
  .nav-container {
    .nav-list {
      justify-content: flex-start;

      .nav-item {
        flex: 0 0 auto;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
      }
    }
  }
}
</style>
