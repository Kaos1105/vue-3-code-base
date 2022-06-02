import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useBreadcrumbSetting() {
  const { t } = useI18n();

  const staffRegistration: any = computed(() => {
    return {
      path: '/setting/staff-registration',
      breadcrumbName: t('breadcrumb.staff_registration'),
    };
  });

  const routesList: any = computed(() => {
    return {
      // auth
      login: [{ path: '/login' }],

      // dashboard
      dashboard: [
        {
          path: '/',
          breadcrumbName: t('breadcrumb.dashboard'),
        },
      ],

      // setting profile
      'setting-profile': [
        {
          path: '/',
          breadcrumbName: t('breadcrumb.setting_profile'),
        },
      ],

      // user profile
      'user-profile': [
        {
          path: '/',
          breadcrumbName: t('breadcrumb.user_profile'),
        },
      ],

      // work data
      'work-data': [
        {
          path: '/attendance/work-data',
          breadcrumbName: t('breadcrumb.attendance'),
        },
      ],

      // approval
      approval: [
        {
          path: '/attendance/approval',
          breadcrumbName: t('breadcrumb.approval'),
        },
      ],

      // time card
      'time-card': [
        {
          path: '/attendance/time-card',
          breadcrumbName: t('breadcrumb.time_card'),
        },
      ],

      // monthly report
      'monthly-report': [
        {
          path: '/attendance/monthly-report',
          breadcrumbName: t('breadcrumb.monthly_report'),
        },
      ],

      // yearly report
      'yearly-report': [
        {
          path: '/attendance/yearly-report',
          breadcrumbName: t('breadcrumb.yearly_report'),
        },
      ],

      // staff registration
      'staff-registration': [staffRegistration.value],
      'staff-edit': [staffRegistration.value],

      // staff registration
      'staff-list': [
        {
          path: '/setting/staff-list',
          breadcrumbName: t('breadcrumb.staff_list'),
        },
      ],

      // basic setting
      'basic-setting': [
        {
          path: '/setting/basic-setting',
          breadcrumbName: t('breadcrumb.basic_setting'),
        },
      ],

      // client branch
      'client-branch': [
        {
          path: '/setting/client-branch',
          breadcrumbName: t('breadcrumb.branch_management'),
        },
      ],
    };
  });

  return { routesList };
}
