import { useI18n } from 'vue-i18n';
import { LOCALE } from '@/enums/localeEnum';

export function usePaginateSetting() {
  const { locale } = useI18n();

  const showTotal = (total, range) => {
    if (locale.value === LOCALE.JA) {
      return `${range[0]} - ${range[1]} 件 / ${total}件`;
    }
    return `${range[0]}-${range[1]} of ${total} items`;
  };

  return { showTotal };
}
