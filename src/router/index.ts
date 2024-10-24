import { createRouter, createWebHashHistory } from 'vue-router'
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
    }
  ];
export const router = createRouter({
    history: createWebHashHistory(),// 设置为hash模式
    routes
});
  
