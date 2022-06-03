import { onMounted, ref } from 'vue';
import { AntdTablePagination, convertPagination, convertSorter } from '@/utils';
import { FilterType, ListData, QueryParams, SorterType } from '@/models/Model';

export function useListTable(fetchList: (params: QueryParams) => Promise<ListData<any>>) {
  const loading = ref<boolean>(false);
  const list = ref<any[]>([]);
  const pagination = ref<AntdTablePagination>({
    current: 1,
    total: 0,
    pageSize: 10,
    position: 'bottom',
  });
  const filter = ref<FilterType[]>([]);
  const sorter = ref<SorterType>({ columnKey: '', order: 'ascend' });
  const include = ref<string>('');

  onMounted(async () => {
    const sorterResult = convertSorter(sorter.value);
    loading.value = true;
    const resp = await fetchList({
      filter: filter.value,
      sort: sorterResult,
      include: include.value,
      page: 1,
      perPage: 10,
    });
    list.value = resp.item.collection;
    pagination.value = convertPagination(resp.item.pagination);
  });

  return { loading, list, pagination, filter, sorter, include };
}
