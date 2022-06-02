import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingStore } from '@/store/setting';

export function useNavigation() {
  const { t } = useI18n();
  const settingStore = useSettingStore();

  const navList = computed(() => {
    return [
      {
        name: 'dashboard',
        label: t('sidebar.dashboard'),
        icon: 'SidebarDashboard',
      },
      {
        name: 'attendance',
        label: t('sidebar.attendance'),
        icon: 'SidebarAttendance',
        children: [
          {
            name: 'work-data',
            label: t('sidebar.work_data'),
          },
          {
            name: 'approval',
            label: t('sidebar.approval'),
          },
          {
            name: 'time-card',
            label: t('sidebar.time_card'),
          },
          {
            name: 'monthly-report',
            label: t('sidebar.monthly_report'),
          },
          {
            name: 'yearly-report',
            label: t('sidebar.yearly_report'),
          },
        ],
      },
      {
        name: 'setting',
        label: t('sidebar.setting'),
        icon: 'SidebarSetting',
        children: [
          {
            name: 'staff-registration',
            label: t('sidebar.staff_registration'),
          },
          {
            name: 'staff-list',
            label: t('sidebar.staff_list'),
          },
          {
            name: 'basic-setting',
            label: t('sidebar.basic_setting'),
            query: settingStore.query,
          },
          {
            name: 'client-branch',
            label: t('sidebar.branch_management'),
          },
        ],
      },
    ];
  });

  return { navList };
}
