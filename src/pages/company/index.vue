<template>
  <div class="staff">
    <search-staff-list @form="onSearch" ref="searchRef" />

    <div class="staff__options">
      <a-pagination
        v-model:current="pagination.current"
        :total="pagination.total"
        :show-total="(total, range) => showTotal(total, range)"
        :page-size="pagination.pageSize"
        :page-size-options="pageSizeOptions"
        :loading="isLoading"
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
        size="middle"
        bordered
        @change="handleChange"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'operation'">
            <button
              class="ant-btn-primary"
              id="btn__operation"
              @click="$router.push({ name: 'staff-registration' })"
            ></button>
          </template>
        </template>

        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'show'">
            <a-checkbox :checked="text" />
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
  import { computed, defineComponent, onBeforeMount, onMounted, ref } from 'vue';
  import SearchStaffList from './components/SearchCompanyList.vue';
  import Company, { CompanyItem } from '@/models/Company';
  import { usePaginateSetting } from '@/hooks/usePaginateSetting';
  import { pageSizeOptionEnum } from '@/enums/pageSizeOptionEnum';
  import { useI18n } from 'vue-i18n';
  import dayjs from 'dayjs';
  import { QueryParams } from '@/models/Model';
  import { useListTable } from '@/hooks/useListTable';

  export default defineComponent({
    name: 'CompanyList',

    components: {
      SearchStaffList,
    },

    setup() {
      const { t } = useI18n();
      const pageSizeOptions = ref<string[]>(pageSizeOptionEnum);
      const { showTotal } = usePaginateSetting();

      const fetchList = (params: QueryParams) => {
        return Company.index<CompanyItem>(params);
      };

      const { loading: isLoading, list: dataSource, pagination } = useListTable(fetchList);

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

      onBeforeMount(() => {});

      onMounted(() => {});

      const onSearch = (evt) => {
        console.log(evt);
      };

      const onChangePage = (page) => {
        pagination.value = { ...pagination.value, current: page };
      };

      const onShowSizeChange = (current: number, pageSize: number) => {
        console.log(current);
        console.log(pageSize);
      };

      const handleChange = async (pagination, filters, sorter) => {
        console.log(pagination);
        console.log(filters);
        console.log(sorter);
      };

      const onDelete = (id) => {
        console.log(id);
      };

      return {
        dayjs,
        pagination,
        pageSizeOptions,
        dataSource,
        isLoading,
        columns,

        fetchList,
        showTotal,
        onSearch,
        onChangePage,
        onShowSizeChange,
        handleChange,
        onDelete,
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
