<template>
  <div class="workdata">
    <search-work-data @form="onFilter" ref="searchRef" />

    <div class="workdata__options" ref="workDataRef">
      <div class="workdata__buttons u-mb-12">
        <a-button type="link" class="btn-excel fs-12">
          {{ $t('common.export_excel') }}
          <template #icon>
            <file-excel-outlined :style="{ fontSize: '24px', color: '#064780' }" />
          </template>
        </a-button>

        <a-button type="link" class="btn-excel fs-12">
          {{ $t('common.import_excel') }}
          <template #icon>
            <file-excel-outlined :style="{ fontSize: '24px', color: '#064780' }" />
          </template>
        </a-button>
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
        @showSizeChange="onShowSizeChange"
      >
        <template #buildOptionText="props">
          <span>{{ props.value }} {{ $t('common.records') }}</span>
        </template>
      </a-pagination>
    </div>
    <div class="workdata__table">
      <a-table
        id="list-table"
        :columns="columns"
        :data-source="dataSource"
        :row-key="(record) => record.id"
        :pagination="false"
        :show-sorter-tooltip="false"
        :scroll="{
          x: 2705,
          y: windowHeight - heightWorkData.height - heightSearch - 122,
        }"
        size="middle"
        bordered
        @change="handleChange"
      >
        <template #bodyCell="{ column, text }">
          <template v-if="['name', 'staff_code'].includes(column.key)">
            <span v-html="highlightText(text, query)"></span>
          </template>

          <template v-if="column.key === 'day'">
            <span v-html="highlightText(dayjs(text).format('YYYY/MM/DD'), query)"></span>
          </template>

          <template v-if="column.key === 'id'">
            <a-button @click="onEdit(text)" size="small" class="fs-12">
              <template #icon><edit-outlined /></template>
              {{ $t('attendance.edit') }}
            </a-button>
          </template>
        </template>
      </a-table>

      <modal-add-record v-model:visible="editVisible" @update="onUpdateRecord">
        <template #default>
          <!-- time to work -->
          <div class="form-group">
            <div class="form-content">
              <div class="form-input">
                <label class="form-label">{{ $t('attendance.time_to_work') }}</label>
                <a-form-item>
                  <a-input v-model:value="formState.time_to_work" />
                </a-form-item>
              </div>
            </div>
          </div>

          <!-- time out -->
          <div class="form-group">
            <div class="form-content">
              <div class="form-input">
                <label class="form-label">{{ $t('attendance.time_out') }}</label>
                <a-form-item>
                  <a-input v-model:value="formState.time_out" />
                </a-form-item>
              </div>
            </div>
          </div>

          <!-- distance -->
          <div class="form-group">
            <div class="form-content">
              <div class="form-input">
                <label class="form-label">{{ $t('attendance.distance') }}</label>
                <a-form-item>
                  <a-input v-model:value="formState.distance" />
                </a-form-item>
              </div>
            </div>
          </div>
        </template>
      </modal-add-record>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, onBeforeMount, reactive } from 'vue';
  import { EditOutlined } from '@ant-design/icons-vue';
  import SearchWorkData from './components/SearchWorkData.vue';
  import { renderWorkData } from '@/faker/workdata';
  import { convertPagination } from '@/utils';
  import { usePaginateSetting } from '@/hooks/usePaginateSetting';
  import { pageSizeOptionEnum } from '@/enums/pageSizeOptionEnum';
  import { ModalAddRecord } from '@/components/Modal';
  import { useHighlight } from '@/hooks/useHighlight';
  import dayjs, { Dayjs } from 'dayjs';
  import { FileExcelOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { Pagination } from '@/type/pagination';
  import { useWindowSize, useElementSize, useResizeObserver } from '@vueuse/core';

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
    time_to_work: string | null | Dayjs;
    time_out: string | null | Dayjs;
    distance: number | null;
  }

  export default defineComponent({
    name: 'WorkData',

    components: {
      EditOutlined,
      SearchWorkData,
      ModalAddRecord,
      FileExcelOutlined,
    },

    setup() {
      const pageSizeOptions = ref<string[]>(pageSizeOptionEnum);
      const pagination = ref<Pagination>(initPagination);
      const dataSource = ref<any[]>([]);
      const editVisible = ref<boolean>(false);
      const searchVisible = ref<boolean>(false);
      const query = ref<string>('');
      const workDataRef = ref<null>(null);
      const searchRef = ref<null>(null);
      const windowHeight = ref<number>(0);
      const heightSearch = ref<number>(0);

      const { t } = useI18n();
      const { showTotal } = usePaginateSetting();
      const { highlightText } = useHighlight();
      const { height } = useWindowSize();
      windowHeight.value = height.value;
      const heightWorkData = reactive(useElementSize(workDataRef));

      const formState = ref<formState>({
        time_to_work: null,
        time_out: null,
        distance: 0,
      });

      const columns = computed(() => {
        return [
          {
            title: t('attendance.name'),
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            fixed: 'left',
          },
          {
            title: t('attendance.staff_code'),
            dataIndex: 'staff_code',
            key: 'staff_code',
            sorter: true,
            fixed: 'left',
          },
          {
            title: t('attendance.day'),
            dataIndex: 'day',
            key: 'day',
            sorter: true,
            fixed: 'left',
          },
          {
            title: t('attendance.edit'),
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            align: 'center',
          },
          {
            title: t('attendance.time_to_work'),
            dataIndex: 'time_to_work',
            key: 'time_to_work',
            sorter: true,
            align: 'center',
          },
          {
            title: t('attendance.time_out'),
            dataIndex: 'time_out',
            key: 'time_out',
            sorter: true,
            align: 'center',
          },
          {
            title: t('attendance.time_expected'),
            dataIndex: 'time_expected',
            key: 'time_expected',
            sorter: true,
          },
          {
            title: t('attendance.time_to_work_rounded'),
            dataIndex: 'time_to_work_rounded',
            key: 'time_to_work_rounded',
            sorter: true,
          },
          {
            title: t('attendance.time_out_rounded'),
            dataIndex: 'time_out_rounded',
            key: 'time_out_rounded',
            sorter: true,
          },
          {
            title: t('attendance.basic_rest'),
            dataIndex: 'basic_rest',
            key: 'basic_rest',
            sorter: true,
          },
          {
            title: t('attendance.rest_start'),
            dataIndex: 'rest_start',
            key: 'rest_start',
            sorter: true,
          },
          {
            title: t('attendance.rest_end'),
            dataIndex: 'rest_end',
            key: 'rest_end',
            sorter: true,
          },
          {
            title: t('attendance.time_work'),
            dataIndex: 'time_work',
            key: 'time_work',
            sorter: true,
          },
          {
            title: t('attendance.device'),
            dataIndex: 'device',
            key: 'device',
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
            title: t('attendance.work_holiday'),
            dataIndex: 'work_holiday',
            key: 'work_holiday',
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
        ];
      });

      useResizeObserver(searchRef, (entries) => {
        const entry = entries[0];
        const { height } = entry.contentRect;
        heightSearch.value = height;
      });

      onBeforeMount(() => {
        const { result } = renderWorkData(20);
        dataSource.value = result.data;
        pagination.value = { ...convertPagination(result.meta) };
      });

      const handleChange = async (pagination, filters, sorter) => {
        console.log(pagination, 'pagination');
        console.log(filters, 'filters');
        console.log(sorter, 'sorter');
      };

      const onShowSizeChange = (current: number, pageSize: number) => {
        console.log(current, pageSize);
      };

      const onEdit = (id: string) => {
        console.log(id);
        editVisible.value = !editVisible.value;
      };

      const onChangePage = (page) => {
        pagination.value = { ...pagination.value, current: page };
      };

      const onFilter = (evt) => {
        console.log(evt);
        query.value = evt.search;
      };

      const onUpdateRecord = () => {
        console.log(formState.value);
      };

      return {
        pagination,
        pageSizeOptions,
        dataSource,
        columns,
        editVisible,
        searchVisible,
        formState,
        query,
        workDataRef,
        searchRef,
        heightWorkData,
        heightSearch,
        windowHeight,
        dayjs,
        showTotal,
        onChangePage,
        handleChange,
        onShowSizeChange,
        onEdit,
        onFilter,
        onUpdateRecord,
        highlightText,
      };
    },
  });
</script>

<style lang="scss">
  @import '@/styles/shared/mixins';
  @import '@/styles/shared/variables';
  .workdata {
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
  }
</style>
