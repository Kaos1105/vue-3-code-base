import { defineStore } from 'pinia';

interface CommonState {
  open: string[] | number[];
}

export const useCommonStore = defineStore({
  id: 'common',

  state: (): CommonState => ({
    open: [],
  }),
});
