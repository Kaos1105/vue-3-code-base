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
    ];
  });

  return { navList };
}
