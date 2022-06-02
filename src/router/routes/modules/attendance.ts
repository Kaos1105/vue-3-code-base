import type { AppRouteModule } from '@/router/types';
import { LAYOUT, BASE } from '@/router/constant';
import { AuthGuard, ResolveGuard } from '@/router/guards';

const attendance: AppRouteModule = {
  path: '/attendance',
  name: 'attendance',
  component: LAYOUT,
  children: [
    {
      path: 'work-data',
      component: BASE,
      children: [
        {
          path: '',
          name: 'work-data',
          beforeEnter: ResolveGuard([AuthGuard]),
          component: () => import('@/pages/attendance/work-data/index.vue'),
          meta: {
            title: 'routes.work_data',
            hasSearch: true,
          },
        },
      ],
    },
    {
      path: 'approval',
      component: BASE,
      children: [
        {
          path: '',
          name: 'approval',
          beforeEnter: ResolveGuard([AuthGuard]),
          component: () => import('@/pages/attendance/approval/index.vue'),
          meta: {
            title: 'routes.approval',
            hasSearch: true,
          },
        },
      ],
    },
    {
      path: 'time-card',
      component: BASE,
      children: [
        {
          path: '',
          name: 'time-card',
          beforeEnter: ResolveGuard([AuthGuard]),
          component: () => import('@/pages/attendance/time-card/index.vue'),
          meta: {
            title: 'routes.time_card',
            hasSearch: true,
          },
        },
      ],
    },
    {
      path: 'monthy-report',
      component: BASE,
      children: [
        {
          path: '',
          name: 'monthly-report',
          beforeEnter: ResolveGuard([AuthGuard]),
          component: () => import('@/pages/attendance/monthy-report/index.vue'),
          meta: {
            title: 'routes.monthly_report',
            hasSearch: true,
          },
        },
      ],
    },
    {
      path: 'yearly-report',
      component: BASE,
      children: [
        {
          path: '',
          name: 'yearly-report',
          beforeEnter: ResolveGuard([AuthGuard]),
          component: () => import('@/pages/attendance/yearly-report/index.vue'),
          meta: {
            title: 'routes.yearly_report',
            hasSearch: true,
          },
        },
      ],
    },
  ],
};

export default attendance;
