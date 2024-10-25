import { createMemoryHistory, createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../page/rankList.vue')
  },
  {
    path: '/userInfo/:id',
    component: () => import('../page/userInfo.vue')
  },
  {
    path: '/auth/github/callback',
    component: () => import('../components/GitHubCallback.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/'
  },
];

export function createVueRouter(type: 'client' | 'server') {
  return createRouter({
    history: type === 'client' ? createWebHistory() : createMemoryHistory(),
    routes
  })
}
