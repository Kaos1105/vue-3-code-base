<template>
  <div class="client">
    <search-client-branch @form="onSearch" ref="searchRef" />

    <div class="client__options" ref="clientBranchRef">
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

    <div class="client__table">
      <a-table
        id="list-table"
        :columns="columns"
        :data-source="dataSource"
        :row-key="(record) => record.id"
        :pagination="false"
        :showSorterTooltip="false"
        :scroll="
          dataSource.length
            ? { x: 870, y: windowHeight - heightBranch.height - heightSearch - 145 }
            : null
        "
        :loading="loading"
        size="middle"
        bordered
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'operation'">
            <button-operation id="btn__operation" @click="visibleBranch = true" />
          </template>
        </template>

        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'name'">
            <span v-html="highlightText(text, query)"></span>
          </template>

          <template v-if="column.dataIndex === 'is_show'">
            <a-checkbox :checked="!!text" />
          </template>

          <template v-if="column.dataIndex === 'create_at'">
            <span v-html="highlightText(dayjs(text).format('YYYY/MM/DD'), query)"></span>
          </template>

          <template v-if="column.dataIndex === 'operation'">
            <!-- operation default -->
            <div class="operation-list">
              <a-button type="primary" class="u-mr-4 fs-12" @click="onEditBranch(record.id)">{{
                $t('common.edit')
              }}</a-button>
              <a-popconfirm
                :title="$t('common.delete_confirm')"
                :ok-text="$t('common.delete')"
                :cancel-text="$t('common.cancel')"
                placement="topLeft"
                @confirm="onDeleteBranch(record.id)"
              >
                <a-button type="primary" danger class="fs-12">
                  {{ $t('common.delete') }}
                </a-button>
              </a-popconfirm>
            </div>
          </template>
        </template>

        <template #expandedRowRender="{ index }">
          <a-table
            class="table__nested"
            :columns="innerColumns"
            :dataSource="
              dataSource[index]['groups']['data'].length ? dataSource[index]['groups']['data'] : []
            "
            :rowKey="(record) => record.id"
            :pagination="false"
            :showSorterTooltip="false"
            :class="!dataSource[index]['groups']['data'].length ? 'table-fixed' : null"
            size="middle"
            bordered
          >
            <template #headerCell="{ column }">
              <template v-if="column.key === 'operation'">
                <button-operation
                  id="btn__operation"
                  @click="
                    visibleGroup = true;
                    formGroup.branch_id = dataSource[index].id;
                  "
                />
              </template>
            </template>

            <template #bodyCell="{ column, text, record }">
              <template v-if="['name', 'detail'].includes(column.dataIndex)">
                <span v-html="highlightText(text, query)"></span>
              </template>

              <template v-if="column.dataIndex === 'operation'">
                <div class="operation-list">
                  <a-button class="u-mr-4 fs-12 btn-primary" @click="onEditGroup(record.id)">{{
                    $t('common.edit')
                  }}</a-button>
                  <a-popconfirm
                    :title="$t('common.delete_confirm')"
                    :ok-text="$t('common.delete')"
                    :cancel-text="$t('common.cancel')"
                    placement="topLeft"
                    @confirm="onDeleteGroup(record.id)"
                  >
                    <a-button class="fs-12 btn-danger">
                      {{ $t('common.delete') }}
                    </a-button>
                  </a-popconfirm>
                </div>
              </template>
            </template>
          </a-table>
        </template>
      </a-table>

      <modal-add-record v-model:visible="visibleBranch" ref="branchRef" @update="onHandleBranch">
        <template #default>
          <a-spin :spinning="spinning">
            <Field
              v-slot="{ value, handleChange, errorMessage }"
              :name="$t('setting.branch_name')"
              v-model="formBranch.name"
              class="form-group"
              as="div"
              rules="required"
            >
              <div class="form-content">
                <div class="form-input">
                  <label class="form-label required">{{ $t('setting.branch_name') }}</label>
                  <a-form-item
                    :help="errorMessage"
                    :validate-status="errorMessage ? 'error' : undefined"
                  >
                    <a-input :value="value" @update:value="handleChange" />
                  </a-form-item>
                </div>
              </div>
            </Field>
            <div class="form-group">
              <div class="form-content">
                <div class="form-input">
                  <label class="form-label">{{ $t('setting.show') }}</label>
                  <a-form-item>
                    <a-checkbox v-model:checked="formBranch.is_show" />
                  </a-form-item>
                </div>
              </div>
            </div>
          </a-spin>
        </template>
      </modal-add-record>

      <modal-add-record
        v-model:visible="visibleGroup"
        :title="$t('setting.group_registration')"
        ref="groupRef"
        @update="onHandleGroup"
      >
        <template #default>
          <a-spin :spinning="spinning">
            <Field
              v-slot="{ value, handleChange, errorMessage }"
              :name="$t('setting.group_name')"
              v-model="formGroup.name"
              class="form-group"
              as="div"
              rules="required"
            >
              <div class="form-content">
                <div class="form-input">
                  <label class="form-label required">{{ $t('setting.group_name') }}</label>
                  <a-form-item
                    :help="errorMessage"
                    :validate-status="errorMessage ? 'error' : undefined"
                  >
                    <a-input :value="value" @update:value="handleChange" />
                  </a-form-item>
                </div>
              </div>
            </Field>
            <div class="form-group">
              <div class="form-content">
                <div class="form-input">
                  <label class="form-label">{{ $t('setting.detail') }}</label>
                  <a-form-item>
                    <a-textarea v-model:value="formGroup.detail" />
                  </a-form-item>
                </div>
              </div>
            </div>
          </a-spin>
        </template>
      </modal-add-record>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue';
  import { pageSizeOptionEnum } from '@/enums/pageSizeOptionEnum';
  import { ModalAddRecord } from '@/components/Modal';
  import { usePaginateSetting } from '@/hooks/usePaginateSetting';
  import { ButtonOperation } from '@/components/Shared';
  import { useI18n } from 'vue-i18n';
  import { convertPagination, splitNameField } from '@/utils';
  import SearchClientBranch from './components/SearchClientBranch.vue';
  import { useHighlight } from '@/hooks/useHighlight';
  import dayjs from 'dayjs';
  import { Pagination } from '@/type/pagination';
  import Branches from '@/models/Branches';
  import Groups from '@/models/Groups';
  import { useRoute, useRouter } from 'vue-router';
  import { assign } from 'lodash-es';
  import { useElementSize, useResizeObserver, useWindowSize } from '@vueuse/core';
  import { useNotification } from '@/hooks/useNotification';

  interface formBranch {
    name: string;
    is_show: boolean | number;
  }

  interface formGroup {
    name: string;
    detail: string;
    branch_id?: string;
  }

  const initPagination = {
    current: 1,
    total: 0,
    pageSize: 20,
    position: 'top',
  };

  const initFormBranch = {
    name: '',
    is_show: false,
  };

  const initFormGroup = {
    name: '',
    detail: '',
    branch_id: '',
  };

  export default defineComponent({
    name: 'ClientBranch',

    components: {
      ButtonOperation,
      SearchClientBranch,
      ModalAddRecord,
    },

    setup() {
      const formBranch = ref<formBranch>(JSON.parse(JSON.stringify(initFormBranch)));
      const formGroup = ref<formGroup>(JSON.parse(JSON.stringify(initFormGroup)));
      const pageSizeOptions = ref<string[]>(pageSizeOptionEnum);
      const pagination = ref<Pagination>(initPagination);
      const dataSource = ref([]);
      const visibleBranch = ref<boolean>(false);
      const visibleGroup = ref<boolean>(false);
      const query = ref<string>('');
      const loading = ref<boolean>(false);
      const spinning = ref<boolean>(false);
      const branchRef = ref();
      const groupRef = ref();
      const clientBranchRef = ref<null>(null);
      const searchRef = ref<null>(null);
      const windowHeight = ref<number>(0);
      const heightSearch = ref<number>(0);

      const { t } = useI18n();
      const { showTotal } = usePaginateSetting();
      const { highlightText } = useHighlight();
      const { height } = useWindowSize();
      windowHeight.value = height.value;
      const heightBranch = reactive(useElementSize(clientBranchRef));
      const route = useRoute();
      const router = useRouter();
      const { onSuccess } = useNotification();

      const columns = computed(() => {
        return [
          {
            title: t('setting.branch_name'),
            dataIndex: 'name',
          },
          {
            title: t('setting.show'),
            dataIndex: 'is_show',
          },
          {
            title: t('setting.registration_date'),
            dataIndex: 'create_at',
          },
          {
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
          },
        ];
      });
      const innerColumns = computed(() => {
        return [
          {
            title: t('setting.group_name'),
            dataIndex: 'name',
            width: '13.5%',
          },
          {
            title: t('setting.detail'),
            dataIndex: 'detail',
            width: '27%',
          },
          {
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: '13%',
          },
        ];
      });

      useResizeObserver(searchRef, (entries) => {
        const entry = entries[0];
        const { height } = entry.contentRect;
        heightSearch.value = height;
      });

      onMounted(() => {
        getListBranches();
      });

      watch(visibleBranch, (val) => {
        if (!val) {
          resetRouter();
          resetFormBranch();
        }
      });

      watch(visibleGroup, (val) => {
        if (!val) {
          resetRouter();
          resetFromGroup();
        }
      });

      const getListBranches = async () => {
        loading.value = true;
        const { data, meta } = await Branches.paginate({
          query: {
            sort: '-created_at',
            'page[number]': pagination.value.current,
            'page[size]': pagination.value.pageSize,
          },
        });
        dataSource.value = data;
        pagination.value = { ...convertPagination(meta.pagination) };
        loading.value = false;
      };

      const onChangePage = (page: number) => {
        pagination.value = { ...pagination.value, current: page };
        getListBranches();
      };

      const onShowSizeChange = (current: number, pageSize: number) => {
        pagination.value = { ...pagination.value, current, pageSize };
        getListBranches();
      };

      const onSearch = (evt) => {
        query.value = evt.search;
      };

      const onHandleBranch = async () => {
        try {
          if (route.query.t === 'branch' && route.query.id) {
            await Branches.updateBranch(route.query.id, formBranch.value);
          } else {
            await Branches.create(formBranch.value);
          }
          visibleBranch.value = false;
          await onSuccess(t('common.msg_success'));
          await getListBranches();
        } catch (error) {
          return error;
        }
      };

      const onEditBranch = async (id) => {
        handleRoute('branch', id);
        visibleBranch.value = true;
        spinning.value = true;
        try {
          const { data } = await Branches.find(id);
          formBranch.value.name = data.name;
          formBranch.value.is_show = !!data.is_show;
          spinning.value = false;
        } catch (error) {
          return error;
        }
      };

      const onDeleteBranch = async (id) => {
        await Branches.deleteBranch(id);
        await onSuccess(t('common.msg_deleted'));
        await getListBranches();
      };

      const onHandleGroup = async () => {
        try {
          if (route.query.t === 'group' && route.query.id) {
            await Groups.updateGroup(route.query.id, formGroup.value);
          } else {
            await Groups.create(formGroup.value);
          }
          visibleGroup.value = false;
          await onSuccess(t('common.msg_success'));
          await getListBranches();
        } catch (error) {
          return error;
        }
      };

      const onEditGroup = async (id) => {
        handleRoute('group', id);
        visibleGroup.value = true;
        spinning.value = true;
        try {
          const { data } = await Groups.find(id);
          formGroup.value = { ...data };
          spinning.value = false;
        } catch (error) {
          return error;
        }
      };

      const onDeleteGroup = async (id) => {
        await Groups.deleteGroup(id);
        await onSuccess(t('common.msg_deleted'));
        await getListBranches();
      };

      const resetRouter = () => {
        let query = assign({}, route.query);
        delete query.t;
        delete query.id;
        router.replace({ query });
      };

      const handleRoute = (type, id) => {
        router.replace({ query: assign({ ...route.query }, { t: type, id }) });
      };

      const resetFormBranch = () => {
        branchRef.value.onCancel();
        formBranch.value = JSON.parse(JSON.stringify(initFormBranch));
      };

      const resetFromGroup = () => {
        groupRef.value.onCancel();
        formGroup.value = JSON.parse(JSON.stringify(initFormGroup));
      };

      return {
        pageSizeOptions,
        pagination,
        columns,
        innerColumns,
        dataSource,
        visibleBranch,
        visibleGroup,
        formBranch,
        formGroup,
        query,
        loading,
        spinning,
        branchRef,
        groupRef,
        clientBranchRef,
        searchRef,
        windowHeight,
        heightSearch,
        heightBranch,
        dayjs,
        showTotal,
        onChangePage,
        onShowSizeChange,
        onHandleBranch,
        onHandleGroup,
        onSearch,
        onEditBranch,
        onDeleteBranch,
        highlightText,
        onEditGroup,
        onDeleteGroup,
        resetFormBranch,
        resetFromGroup,
        splitNameField,
      };
    },
  });
</script>

<style lang="scss">
  @import '@/styles/shared/mixins';
  @import '@/styles/shared/variables';

  .ant-calendar-picker {
    width: 100%;
  }

  .client {
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

    &__table {
      .table__nested {
        padding: 15px 7px 15px 0;
        table {
          th,
          .ant-table-tbody > tr > td {
            border-color: #cdcdcd;
          }
        }
      }
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
  }
</style>
