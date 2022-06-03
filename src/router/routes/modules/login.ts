import type { AppRouteModule } from '@/router/types';
import { ResolveGuard, LoginGuard } from '@/router/guards';

const login: AppRouteModule = {
  path: '/login',
  name: 'login',
  beforeEnter: ResolveGuard([LoginGuard]),
  component: () => import('@/pages/auth/index.vue'),
  meta: { title: 'routes.login' },
};

export default login;
