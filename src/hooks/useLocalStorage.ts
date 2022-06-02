import { createStorage, StorageOptions } from '@/shared/createStorage';
import { onBeforeMount } from 'vue';

export function useLocalStorage(key: string, options?: StorageOptions, runOnMount = true) {
  const { item, getItem, setItem, removeItem } = createStorage(localStorage, key, options);

  onBeforeMount(() => runOnMount && getItem());

  return {
    item,
    getItem,
    setItem,
    removeItem,
  };
}
