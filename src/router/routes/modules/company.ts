import type { AppRouteModule } from '@/router/types';
import { LAYOUT, BASE } from '@/router/constant';
import { AuthGuard, ResolveGuard } from '@/router/guards';

const company: AppRouteModule = {
  path: '/master',
  name: 'master',
  component: LAYOUT,
  children: [
    {
      path: '/companies',
      component: BASE,
      children: [
        {
          path: '',
          name: 'company_list',
          beforeEnter: ResolveGuard([AuthGuard]),
          component: () => import('@/pages/company/index.vue'),
          meta: {
            title: 'routes.company_list',
          },
        },
      ],
    },
  ],
};

export default company;
