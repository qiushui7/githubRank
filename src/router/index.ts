import { createRouter, createWebHashHistory } from 'vue-router'
import GitHubCallback from '../components/GitHubCallback.vue';

const routes = [
    {
      path: '/',
      component: ()=>import('../page/rankList.vue')
    },
    {
      path: '/userInfo/:id',
      component: ()=>import('../page/userInfo.vue')
    },
    {
      path:'/:pathMatch(.*)',
      redirect:'/'
    },
    {
      path: '/auth/github/callback',
      component: GitHubCallback
    }
  ];

export const router = createRouter({
    history: createWebHashHistory(),// 设置为hash模式
    routes
});
  
