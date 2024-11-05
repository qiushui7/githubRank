import { ref, reactive } from 'vue';

export type PreloadKey = 'recommendDevelopers' | any;

// 预加载数据的接口
export type PreloadState = Record<any, any>;

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

const obj = {
  recommendDevelopers: [],
  qiushui7: {
    userInfo: {},
  },
};
