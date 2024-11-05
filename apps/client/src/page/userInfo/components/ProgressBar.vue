<template>
  <div class="progress-container">
    <div
      class="progress-bar"
      :style="{
        width: `${percentage}%`,
      }"
    >
      <span v-if="showText" class="progress-text">{{ percentage }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  percentage: number;
  showText?: boolean;
}>();
</script>

<style scoped lang="less">
.progress-container {
  width: 100%;
  height: 10px;
  background-color: var(--border-color);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  border-radius: 5px;
  transition: width 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2196f3;
}

.progress-text {
  color: #fff;
  font-size: 12px;
  position: absolute;
  right: 5px;
}
</style>
