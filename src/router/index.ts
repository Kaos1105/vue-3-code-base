import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { basicRoutes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTER_BASE as string),
  linkActiveClass: 'is-active',
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
