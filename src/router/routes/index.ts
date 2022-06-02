import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types';
import { keys, forEach } from 'lodash-es';

const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: AppRouteModule[] = [];

forEach(keys(modules), (key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: '/login',
};

// Basic routing without permission
export const basicRoutes = [RootRoute, ...routeModuleList];
