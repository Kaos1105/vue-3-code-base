<template>
  <div class="time-card">
    <search-time-card @form="onSearch" />
    <div class="time-card__options">
      <div class="time-card__buttons u-mb-12">
        <a-button type="link" class="btn-excel fs-12">
          {{ $t('common.export_excel') }}
          <template #icon>
            <file-excel-outlined :style="{ fontSize: '24px', color: '#064780' }" />
          </template>
        </a-button>

        <a-button type="link" class="btn-excel fs-12" @click="editVisible = true">
          {{ $t('attendance.multiple_export') }}
          <template #icon>
            <file-excel-outlined :style="{ fontSize: '24px', color: '#064780' }" />
          </template>
        </a-button>

        <modal-multiple-export v-model:visible="editVisible" />
      </div>

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
    <div class="time-card__table">
      <h1 style="text-align: center">{{ dataSource[0].name }}({{ dataSource[0].user_id }})</h1>
      <a-table
        id="list-table"
        :columns="columns"
        :data-source="dataSource"
        :row-key="(record) => record.id"
        :pagination="false"
        :show-sorter-tooltip="false"
        :scroll="{ x: 'max-content' }"
        :customRow="customRow"
        bordered
        size="middle"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'day_calender'">
            <span class="d-block">所定 07:15</span>
            <span class="d-block">2022年04月</span>
          </template>
        </template>
      </a-table>
      <a-row type="flex" justify="space-around">
        <a-col :sm="24" :md="24" :lg="17" :xl="17" style="margin-top: 1rem">
          <table-summary-time-card />
        </a-col>
        <a-col :sm="24" :md="24" :lg="6" :xl="6" style="margin-top: 1rem">
          <table-working />
          <table-attendance-type style="margin-top: 1rem" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, ref, computed } from 'vue';
  import { renderTimecard1 } from '@/faker/timecard';
  import SearchTimeCard from './components/SearchTimecard.vue';
  import TableSummaryTimeCard from './components/TableSummaryTimecard.vue';
  import TableWorking from './components/TableWorking.vue';
  import TableAttendanceType from './components/TableAttendanceType.vue';
  import ModalMultipleExport from './components/ModalMultipleExport.vue';
  import { convertPagination } from '@/utils';
  import { usePaginateSetting } from '@/hooks/usePaginateSetting';
  import { pageSizeOptionEnum } from '@/enums/pageSizeOptionEnum';
  import { useI18n } from 'vue-i18n';
  import { FileExcelOutlined } from '@ant-design/icons-vue';

  import { Pagination } from '@/type/pagination';

  const initPagination = {
    current: 1,
    defaultCurrent: 10,
    defaultPageSize: 0,
    pageSize: 0,
    position: 'top',
    total: 0,
    totalPage: 0,
  };

  export default defineComponent({
    name: 'TimeCard',

    components: {
      SearchTimeCard,
      TableSummaryTimeCard,
      TableWorking,
      TableAttendanceType,
      ModalMultipleExport,
      FileExcelOutlined,
    },

    setup() {
      const { t } = useI18n();
      const { showTotal } = usePaginateSetting();

      const pageSizeOptions = ref<string[]>(pageSizeOptionEnum);
      const pagination = ref<Pagination>(initPagination);
      const editVisible = ref<boolean>(false);
      const dataSource = ref<any[]>([]);

      const columns = computed(() => {
        return [
          {
            dataIndex: 'day_calender',
            key: 'day_calender',
            sorter: true,
            fixed: 'left',
          },
          {
            title: t('attendance.time_to_work'),
            dataIndex: 'time_to_work',
            key: 'time_to_work',
            sorter: true,
          },
          {
            title: t('attendance.time_out'),
            dataIndex: 'time_out',
            key: 'time_out',
            sorter: true,
          },
          {
            title: t('attendance.time_expected'),
            dataIndex: 'time_expected',
            key: 'time_expected',
            sorter: true,
          },
          {
            title: t('attendance.basic_rest'),
            dataIndex: 'basic_rest',
            key: 'basic_rest',
            sorter: true,
          },
          {
            title: t('attendance.time_work'),
            dataIndex: 'time_work',
            key: 'time_work',
            sorter: true,
          },
          {
            title: t('attendance.overtime'),
            dataIndex: 'overtime',
            key: 'overtime',
            sorter: true,
          },
          {
            title: t('attendance.overtime_night'),
            dataIndex: 'overtime_night',
            key: 'overtime_night',
            sorter: true,
          },
          {
            title: t('attendance.work_night'),
            dataIndex: 'work_night',
            key: 'work_night',
            sorter: true,
          },
          {
            title: t('attendance.overtime_holiday'),
            dataIndex: 'overtime_holiday',
            key: 'overtime_holiday',
            sorter: true,
          },
          {
            title: t('attendance.overtime_holiday_night'),
            dataIndex: 'overtime_holiday_night',
            key: 'overtime_holiday_night',
            sorter: true,
          },
          {
            title: t('attendance.overtime_dayoff_night'),
            dataIndex: 'overtime_dayoff_night',
            key: 'overtime_dayoff_night',
            sorter: true,
          },
          {
            title: t('attendance.distance'),
            dataIndex: 'distance',
            key: 'distance',
            sorter: true,
          },
          {
            title: t('attendance.trip'),
            dataIndex: 'trip',
            key: 'trip',
            sorter: true,
          },
          {
            title: t('attendance.driver'),
            dataIndex: 'driver',
            key: 'driver',
            sorter: true,
          },
          {
            title: t('attendance.note'),
            dataIndex: 'note',
            key: 'note',
            sorter: true,
          },
          {
            title: t('attendance.allowance'),
            dataIndex: 'allowance',
            key: 'allowance',
            sorter: true,
          },
          {
            title: t('attendance.attendance_type'),
            dataIndex: 'attendance_type',
            key: 'attendance_type',
            sorter: true,
          },
        ];
      });

      onBeforeMount(() => {
        const timecard1 = renderTimecard1(31);

        dataSource.value = timecard1.result.data;
        pagination.value = { ...convertPagination(timecard1.result.meta) };
      });

      const onChangePage = (page) => {
        pagination.value = { ...pagination.value, current: page };
      };

      const onSearch = (evt) => {
        console.log(evt);
      };

      const customRow = (record) => {
        return {
          onClick: (_event) => {
            console.log(record.day_calender);
          },
        };
      };

      return {
        pageSizeOptions,
        editVisible,
        columns,
        dataSource,
        pagination,
        showTotal,
        onChangePage,
        onSearch,
        customRow,
      };
    },
  });
</script>

<style lang="scss">
  @import '@/styles/shared/mixins';
  @import '@/styles/shared/variables';
  .time-card {
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
