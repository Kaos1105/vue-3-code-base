<template>
  <div class="reject-request">
    <search-attendance-request @form="onSearch" ref="searchRef" />

    <div class="reject-request__options" ref="rejectRef">
      <a-pagination
        v-model:current="pagination.current"
        :total="pagination.total"
        :show-total="(total, range) => showTotal(total, range)"
        :page-size="pagination.pageSize"
        :page-size-options="pageSizeOptions"
        size="small"
        show-size-changer
        @change="onChangePage"
      >
        <template #buildOptionText="props">
          <span>{{ props.value }} {{ $t('common.records') }}</span>
        </template>
      </a-pagination>
    </div>

    <div class="reject-request__table">
      <a-table
        id="list-table"
        :columns="columns"
        :data-source="dataSource"
        :row-key="(record) => record.id"
        :pagination="false"
        :show-sorter-tooltip="false"
        :scroll="{ x: 1008, y: windowHeight - heightReject.height - heightSearch - 182 }"
        size="middle"
        bordered
      >
        <template #bodyCell="{ column, record, text }">
          <template v-if="['id', 'name'].includes(column.key)">
            <span v-html="highlightText(text, query)"></span>
          </template>

          <template v-if="column.key === 'day'">
            <span v-html="highlightText(dayjs(text).format('YYYY/MM/DD'), query)"></span>
          </template>

          <template v-if="column.key === 'application_content'">
            <a-row :gutter="25">
              <a-col :span="24">
                <span>{{ record.time_expected }}</span>
              </a-col>
              <a-col :span="24">
                <span style="color: red">{{ $t('attendance.rejected') }}</span>
                <span> | {{ record.reason }}</span>
              </a-col>
              <a-col :span="24">
                <span>{{ record.note }}</span>
              </a-col>
              <a-col :span="24">
                <span>{{ record.time_approve }}</span>
              </a-col>
            </a-row>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, ref, computed, reactive } from 'vue';
  import SearchAttendanceRequest from './SearchAttendanceRequest.vue';
  import { renderWaitingRequest } from '@/faker/waitingRequest';
  import { convertPagination } from '@/utils';
  import { usePaginateSetting } from '@/hooks/usePaginateSetting';
  import { pageSizeOptionEnum } from '@/enums/pageSizeOptionEnum';
  import { useHighlight } from '@/hooks/useHighlight';
  import { useI18n } from 'vue-i18n';
  import dayjs from 'dayjs';
  import { Pagination } from '@/type/pagination';
  import { useElementSize, useResizeObserver, useWindowSize } from '@vueuse/core';

  const initPagination = {
    current: 1,
    defaultCurrent: 10,
    defaultPageSize: 0,
    pageSize: 0,
    position: 'top',
    total: 0,
    totalPage: 0,
  };

  interface formState {
    note: string;
  }

  export default defineComponent({
    name: 'WaitingRequest',

    components: {
      SearchAttendanceRequest,
    },

    setup() {
      const formState = ref<formState>({
        note: '',
      });
      const query = ref<string>('');
      const searchRef = ref<null>(null);
      const rejectRef = ref<null>(null);
      const windowHeight = ref<number>(0);
      const heightSearch = ref<number>(0);

      const { t } = useI18n();
      const { showTotal } = usePaginateSetting();
      const { highlightText } = useHighlight();
      const { height } = useWindowSize();
      windowHeight.value = height.value;
      const heightReject = reactive(useElementSize(rejectRef));

      const pageSizeOptions = ref<string[]>(pageSizeOptionEnum);
      const pagination = ref<Pagination>(initPagination);
      const dataSource = ref<any[]>([]);

      const columns = computed(() => {
        return [
          {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
          },
          {
            title: t('attendance.name'),
            dataIndex: 'name',
            key: 'name',
            sorter: true,
          },
          {
            title: t('attendance.day'),
            dataIndex: 'day',
            key: 'day',
            sorter: true,
          },
          {
            title: t('attendance.attendance_time'),
            dataIndex: 'time_expected',
            key: 'time_expected',
            sorter: true,
          },
          {
            title: t('attendance.application_content'),
            key: 'application_content',
            sorter: true,
          },
          {
            title: t('attendance.application_type'),
            dataIndex: 'apllication_type',
            key: 'apllication_type',
            align: 'center',
            sorter: true,
          },
        ];
      });

      useResizeObserver(searchRef, (entries) => {
        const entry = entries[0];
        const { height } = entry.contentRect;
        heightSearch.value = height;
      });

      onBeforeMount(() => {
        const { result } = renderWaitingRequest(20);
        dataSource.value = result.data;
        pagination.value = { ...convertPagination(result.meta) };
      });

      const onChangePage = (page) => {
        pagination.value = { ...pagination.value, current: page };
      };

      const onSearch = (evt) => {
        console.log(evt);
        query.value = evt.search;
      };

      return {
        pageSizeOptions,
        columns,
        dataSource,
        pagination,
        formState,
        query,
        searchRef,
        rejectRef,
        windowHeight,
        heightReject,
        dayjs,
        heightSearch,
        showTotal,
        onChangePage,
        onSearch,
        highlightText,
      };
    },
  });
</script>

<style lang="scss">
  @import '@/styles/shared/mixins';
  @import '@/styles/shared/variables';
  .reject-request {
    .ant-table-column-sorters {
      display: flex !important;
      align-items: center !important;

      .ant-table-column-sorter {
        margin-bottom: 4px;
      }
    }

    &__options {
      @include flexbox(flex-end, flex-end);
      flex-direction: column;
      margin: 10px 15px 10px 0;
    }

    &__buttons {
      display: flex;
      align-content: center;

      .ant-btn-icon-only {
        display: inherit;
      }
    }

    &__pagination {
      margin-top: 16px;
    }

    &__list {
      white-space: nowrap;

      .ant-table-placeholder {
        padding-top: 48px;
      }

      .ant-table-thead {
        tr > th:first-child {
          width: 12px;
          height: 12px;
        }
      }

      .ant-table-tbody {
        tr > td:first-child {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
</style>
