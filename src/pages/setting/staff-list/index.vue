<template>
  <div class="staff">
    <search-staff-list @form="onSearch" ref="searchRef" />

    <div class="staff__options" ref="staffRef">
      <div class="staff__buttons u-mb-12">
        <a-button type="link" class="btn-excel fs-12" @click="exportExcel">
          {{ $t('common.export_excel') }}
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

    <div class="staff__table">
      <a-table
        id="list-table"
        :columns="columns"
        :data-source="dataSource"
        :row-key="(record) => record.id"
        :pagination="false"
        :show-sorter-tooltip="false"
        :scroll="{
          x: locale === 'ja' ? 1152 : 1368,
          y: windowHeight - heightStaff.height - heightSearch - 144,
        }"
        size="middle"
        bordered
        @change="handleChange"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'operation'">
            <button-operation
              id="btn__operation"
              @click="$router.push({ name: 'staff-registration' })"
            />
          </template>
        </template>

        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'name'">
            <router-link
              class="custom__href"
              :to="{ name: 'staff-edit', params: { id: record.id } }"
              target="_blank"
              v-html="highlightText(text, query)"
            />
          </template>

          <template v-if="['staff_code', 'email', 'group_name'].includes(column.dataIndex)">
            <span v-html="highlightText(text, query)"></span>
          </template>

          <template v-if="column.dataIndex === 'registration_date'">
            <span v-html="highlightText(dayjs(text).format('YYYY/MM/DD'), query)"></span>
          </template>

          <template v-if="column.dataIndex === 'show'">
            <a-checkbox :checked="text" />
          </template>

          <template v-if="column.dataIndex === 'retransmission'">
            <a-button class="fs-12" style="padding: 0 10px" @click="onRetransmission(record)">
              <template #icon><mail-outlined /></template>
              {{ $t('setting.retransmission') }}
            </a-button>
          </template>

          <template v-if="column.dataIndex === 'operation'">
            <div class="operation-list">
              <a-popconfirm
                v-if="dataSource.length"
                :title="$t('common.delete_confirm')"
                :ok-text="$t('common.delete')"
                :cancel-text="$t('common.cancel')"
                @confirm="onDelete(record.id)"
              >
                <a-button type="primary" danger class="fs-12">
                  {{ $t('common.delete') }}
                </a-button>
              </a-popconfirm>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeMount, onMounted, reactive, ref } from 'vue';
  import { MailOutlined } from '@ant-design/icons-vue';
  import SearchStaffList from './components/SearchStaffList.vue';
  import { renderStaff } from '@/faker/staff';
  import { convertPagination } from '@/utils';
  import { usePaginateSetting } from '@/hooks/usePaginateSetting';
  import { pageSizeOptionEnum } from '@/enums/pageSizeOptionEnum';
  import { useI18n } from 'vue-i18n';
  import dayjs from 'dayjs';
  import { ButtonOperation } from '@/components/Shared';
  import { useHighlight } from '@/hooks/useHighlight';
  import { FileExcelOutlined } from '@ant-design/icons-vue';
  import { useWindowSize, useElementSize, useResizeObserver } from '@vueuse/core';
  import { LOCALE } from '@/enums/localeEnum';
  import { useLocalStorage } from '@/hooks/useLocalStorage';
  import { LocalStorageEnum } from '@/enums/localStorageEnum';
  import { Pagination } from '@/type/pagination';

  const initPagination = {
    current: 0,
    total: 0,
    pageSize: 0,
    position: 'top',
  };

  export default defineComponent({
    name: 'StaffList',

    components: {
      ButtonOperation,
      SearchStaffList,
      MailOutlined,
      FileExcelOutlined,
    },

    setup() {
      const { t } = useI18n();
      const pageSizeOptions = ref<string[]>(pageSizeOptionEnum);
      const pagination = ref<Pagination>(initPagination);
      const dataSource = ref<any[]>([]);
      const query = ref<string>('');
      const staffRef = ref<null>(null);
      const searchRef = ref<null>(null);
      const windowHeight = ref<number>(0);
      const heightSearch = ref<number>(0);
      const locale = ref<string>('');

      const { item } = useLocalStorage(LocalStorageEnum.LANGUAGE);
      const { showTotal } = usePaginateSetting();
      const { highlightText } = useHighlight();
      const { height } = useWindowSize();
      windowHeight.value = height.value;
      const heightStaff = reactive(useElementSize(staffRef));

      const columns = computed(() => {
        return [
          {
            title: t('setting.name'),
            dataIndex: 'name',
            key: 'name',
            sorter: true,
          },
          {
            title: t('setting.staff_code'),
            dataIndex: 'staff_code',
            key: 'staff_code',
            sorter: true,
          },
          {
            title: t('setting.email'),
            dataIndex: 'email',
            key: 'email',
            sorter: true,
          },
          {
            title: t('setting.group_name'),
            dataIndex: 'group_name',
            key: 'group_name',
            sorter: true,
          },
          {
            title: t('setting.registration_date'),
            dataIndex: 'registration_date',
            key: 'registration_date',
            sorter: true,
          },
          {
            title: t('setting.show'),
            dataIndex: 'show',
            key: 'show',
          },
          {
            title: '#',
            dataIndex: 'retransmission',
            key: 'retransmission',
          },
          {
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
          },
        ];
      });

      useResizeObserver(searchRef, (entries) => {
        const entry = entries[0];
        const { height } = entry.contentRect;
        heightSearch.value = height;
      });

      onBeforeMount(() => {
        const { result } = renderStaff(20);
        dataSource.value = result.data;
        pagination.value = { ...convertPagination(result.meta) };
      });

      onMounted(() => {
        locale.value = item.value || LOCALE.JA;
      });

      const exportExcel = () => {
        console.log('export');
      };

      const onSearch = (evt) => {
        console.log(evt);
        query.value = evt.search;
      };

      const onChangePage = (page) => {
        pagination.value = { ...pagination.value, current: page };
      };

      const onShowSizeChange = (current: number, pageSize: number) => {
        console.log(current, pageSize);
      };

      const handleChange = async (pagination, filters, sorter) => {
        console.log(pagination, 'pagination');
        console.log(filters, 'filters');
        console.log(sorter, 'sorter');
      };

      const onRetransmission = (record) => {
        console.log(record);
      };

      const onDelete = (id) => {
        console.log(id);
      };

      return {
        dayjs,
        pagination,
        pageSizeOptions,
        dataSource,
        columns,
        query,
        staffRef,
        searchRef,
        windowHeight,
        heightSearch,
        heightStaff,
        locale,
        exportExcel,
        showTotal,
        onSearch,
        onChangePage,
        onShowSizeChange,
        handleChange,
        onRetransmission,
        onDelete,
        highlightText,
      };
    },
  });
</script>

<style lang="scss">
  @import '@/styles/shared/mixins';
  @import '@/styles/shared/variables';

  .staff {
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
      margin: 15px 15px 15px 0;
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
