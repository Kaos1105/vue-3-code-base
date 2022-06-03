const enum UseFlgEnum {
  all = '全て',
  use = '使用中',
  not_use = '未使用',
}

export const useFlgEnum = [
  {
    value: null,
    label: UseFlgEnum.all,
  },
  {
    value: true,
    label: UseFlgEnum.use,
  },
  {
    value: false,
    label: UseFlgEnum.not_use,
  },
];
