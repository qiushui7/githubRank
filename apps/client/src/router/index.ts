import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../page/recommend/index.vue'),
  },
  {
    path: '/search',
    component: () => import('../page/search/index.vue'),
  },
  {
    path: '/userInfo/:id',
    component: () => import('../page/userInfo/index.vue'),
  },
  {
    path: '/auth/github/callback',
    component: () => import('../components/GitHubCallback.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/',
  },
];

export function createVueRouter(type: 'client' | 'server') {
  return createRouter({
    history: type === 'client' ? createWebHistory() : createMemoryHistory(),
    routes,
  });
}
