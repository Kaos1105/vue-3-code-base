import { defineStore } from 'pinia';

interface queryState {
  tab: string;
}

interface settingState {
  query: queryState;
}

export const useSettingStore = defineStore({
  id: 'setting',

  state: (): settingState => ({
    query: { tab: 'job-category' },
  }),

  actions: {},
});
