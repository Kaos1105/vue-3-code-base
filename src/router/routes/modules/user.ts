import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { AuthGuard, ResolveGuard } from '@/router/guards';

const user: AppRouteModule = {
  path: '/user',
  name: 'user',
  component: LAYOUT,
  children: [
    {
      path: 'profile',
      name: 'user-profile',
      beforeEnter: ResolveGuard([AuthGuard]),
      component: () => import('@/pages/auth/profile/index.vue'),
      meta: {
        title: 'routes.user_profile',
        hasSearch: false,
      },
    },
    {
      path: 'setting',
      name: 'setting-profile',
      beforeEnter: ResolveGuard([AuthGuard]),
      component: () => import('@/pages/auth/setting/index.vue'),
      meta: {
        title: 'routes.setting_profile',
        hasSearch: false,
      },
    },
  ],
};

export default user;
