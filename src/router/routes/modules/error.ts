import type { AppRouteModule } from '@/router/types';

const error: AppRouteModule = {
  path: '/error',
  name: 'error',
  component: () => import('@/pages/error/index.vue'),
  meta: { title: 'routes.error' },
};

export default error;
