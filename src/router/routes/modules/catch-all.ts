import type { AppRouteModule } from '@/router/types';

const catchAll: AppRouteModule = {
  path: '/:catchAll(.*)',
  redirect: '/error',
};

export default catchAll;
