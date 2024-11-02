import { ref, reactive } from 'vue';

// 预加载数据的接口
export interface PreloadState {
  recommendDevelopers?: any[];
  // ... 其他需要预加载的数据
}

// 创建预加载状态管理
export function createPreloadStore() {
  const state = reactive<PreloadState>({});
  const isPreloaded = ref(false);

  const setPreloadData = (data: Partial<PreloadState>) => {
    Object.assign(state, data);
    isPreloaded.value = true;
  };

  return {
    state,
    isPreloaded,
    setPreloadData,
  };
}

export type PreloadStore = ReturnType<typeof createPreloadStore>;
