import type { DirectiveBinding } from 'vue';

// 创建一个 IntersectionObserver 实例
const createObserver = (el: HTMLImageElement, binding: DirectiveBinding) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 当图片进入视口时加载图片
          el.src = binding.value;
          // 加载后取消观察
          observer.unobserve(el);
        }
      });
    },
    {
      // 配置项：当图片进入视口 10px 时就开始加载
      rootMargin: '10px',
    },
  );

  observer.observe(el);
};

export const lazyLoad = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    // 设置默认的占位图
    el.src =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="%23ccc" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/%3E%3C/path%3E%3C/svg%3E';

    // 如果浏览器支持 IntersectionObserver
    if ('IntersectionObserver' in window) {
      createObserver(el, binding);
    } else {
      // 降级处理：直接加载图片
      el.src = binding.value;
    }
  },
};
