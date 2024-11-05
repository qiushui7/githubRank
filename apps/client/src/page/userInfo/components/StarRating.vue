<template>
  <div class="star-rating" :class="{ 'is-disabled': disabled }">
    <div class="stars-container">
      <span
        v-for="index in 5"
        :key="index"
        class="star"
        :class="{
          'is-filled': modelValue >= index,
          'is-hovered': hoverRating >= index && !disabled,
        }"
        @mouseover="!disabled && (hoverRating = index)"
        @mouseleave="!disabled && (hoverRating = 0)"
        @click="!disabled && updateRating(index)"
      >
        <svg
          viewBox="0 0 24 24"
          :fill="getStarColor(index)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          />
        </svg>
      </span>
    </div>
    <span v-if="showScore" class="rating-score">{{
      modelValue.toFixed(1)
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, Ref } from 'vue';

const props = defineProps<{
  modelValue: number;
  disabled?: boolean;
  showScore?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const isDarkTheme = inject<Ref<boolean>>('isDarkTheme', ref(false));
const hoverRating = ref(0);

const getStarColor = (index: number) => {
  if (props.modelValue >= index || hoverRating.value >= index) {
    return '#2196f3';
  }
  return isDarkTheme.value ? '#ffffff20' : '#00000020';
};

const updateRating = (rating: number) => {
  emit('update:modelValue', rating);
};
</script>

<style scoped lang="less">
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  .stars-container {
    display: flex;
    gap: 0.25rem;
  }

  .star {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }

    svg {
      width: 100%;
      height: 100%;
      transition: fill 0.3s ease;
    }
  }

  .rating-score {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color);
  }

  &.is-disabled {
    .star {
      cursor: default;
      &:hover {
        transform: none;
      }
    }
  }
}
</style>
