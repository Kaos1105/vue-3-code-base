import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useNavigation() {
  const { t } = useI18n();

  const navList = computed(() => {
    return [
      {
        name: 'dashboard',
        label: t('sidebar.dashboard'),
        icon: 'SidebarDashboard',
      },
      {
        name: 'master',
        label: t('sidebar.master'),
        icon: 'SidebarAttendance',
        children: [
          {
            name: 'company_list',
            label: t('sidebar.company_list'),
          },
        ],
      },
    ];
  });

  return { navList };
}
