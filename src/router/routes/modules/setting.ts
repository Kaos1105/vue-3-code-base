import type { AppRouteModule } from '@/router/types';
import { LAYOUT, BASE } from '@/router/constant';
import { AuthGuard, ResolveGuard } from '@/router/guards';

const setting: AppRouteModule = {
  path: '/setting',
  name: 'setting',
  component: LAYOUT,
  children: [
    {
      path: 'staff-registration',
      component: BASE,
      children: [
        {
          path: '',
          name: 'staff-registration',
          beforeEnter: ResolveGuard([AuthGuard]),
          component: () => import('@/pages/setting/staff-registration/index.vue'),
          meta: {
            title: 'routes.staff_registration',
            hasSearch: false,
          },
        },
        {
          path: ':id/edit',
          name: 'staff-edit',
          beforeEnter: ResolveGuard([AuthGuard]),
          component: () => import('@/pages/setting/staff-registration/edit/index.vue'),
          meta: {
            title: 'routes.registration_edit',
            hasSearch: false,
          },
        },
      ],
    },
    {
      path: 'staff-list',
      component: BASE,
      children: [
        {
          path: '',
          name: 'staff-list',
          beforeEnter: ResolveGuard([AuthGuard]),
          component: () => import('@/pages/setting/staff-list/index.vue'),
          meta: {
            title: 'routes.staff_list',
            hasSearch: true,
          },
        },
      ],
    },
    {
      path: 'basic-setting',
      component: BASE,
      children: [
        {
          path: '',
          name: 'basic-setting',
          beforeEnter: ResolveGuard([AuthGuard]),
          component: () => import('@/pages/setting/basic-setting/index.vue'),
          meta: {
            title: 'routes.basic_setting',
            hasSearch: true,
          },
        },
      ],
    },
    {
      path: 'client-branch',
      component: BASE,
      children: [
        {
          path: '',
          name: 'client-branch',
          beforeEnter: ResolveGuard([AuthGuard]),
          component: () => import('@/pages/setting/client-branch/index.vue'),
          meta: {
            title: 'routes.branch_management',
            hasSearch: true,
          },
        },
      ],
    },
  ],
};

export default setting;
