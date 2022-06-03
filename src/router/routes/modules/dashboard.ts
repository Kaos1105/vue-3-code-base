import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { ResolveGuard, AuthGuard } from '@/router/guards';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  component: LAYOUT,
  children: [
    {
      path: '',
      name: 'dashboard',
      beforeEnter: ResolveGuard([AuthGuard]),
      component: () => import('@/pages/dashboard/index.vue'),
      meta: {
        title: 'routes.dashboard',
      },
    },
  ],
};

export default dashboard;
