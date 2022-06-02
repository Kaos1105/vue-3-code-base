<template>
  <div class="job">
    <search-table-job-category @form="onSearch" ref="searchRef" />

    <div class="job__options" ref="categoryRef">
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

    <div class="job__table">
      <a-table
        id="list-table"
        :columns="columns"
        :data-source="dataSource"
        :row-key="(record) => record.id"
        :pagination="false"
        :show-sorter-tooltip="false"
        :scroll="{ x: 700, y: windowHeight - heightCategory.height - heightSearch - 190 }"
        :loading="loading"
        size="middle"
        bordered
      >
        <template #headerCell="{ column }">
          <template v-if="column.dataIndex === 'operation'">
            <a-button id="btn__operation" class="fs-12 btn-default" @click="visible = true">
              {{ $t('common.new') }}
            </a-button>
          </template>
        </template>

        <template #bodyCell="{ column, record, text }">
          <template v-if="column.dataIndex === 'name'">
            <!-- has action -->
            <template v-if="editableData[record.id]">
              <form @submit.prevent>
                <Field
                  v-slot="{ value, handleChange, errorMessage }"
                  v-model="editableData[record.id]['name']"
                  :name="`${record.id}_${$t('setting.job_category')}`"
                  class="form-group"
                  rules="required"
                >
                  <div class="form-content">
                    <a-form-item
                      :help="splitNameField(errorMessage, `${record.id}_`)"
                      :validate-status="errorMessage ? 'error' : undefined"
                    >
                      <a-input :value="value" @update:value="handleChange" />
                    </a-form-item>
                  </div>
                </Field>
              </form>
            </template>

            <template v-else>
              <span v-html="highlightText(text, query)"></span>
            </template>
          </template>

          <template v-if="column.dataIndex === 'is_show'">
            <template v-if="editableData[record.id]">
              <a-checkbox v-model:checked="editableData[record.id]['is_show']" />
            </template>
            <template v-else>
              <a-checkbox :checked="!!record.is_show" />
            </template>
          </template>

          <template v-if="column.dataIndex === 'operation'">
            <!-- approve -->
            <div v-if="editableData[record.id]" class="operation-list">
              <a-button type="primary" class="u-mr-4 fs-12" @click="onSave(record.id)">{{
                $t('common.update')
              }}</a-button>
              <a-button type="default" class="fs-12 u-px-4" @click="onCancel(record.id)">{{
                $t('common.cancel')
              }}</a-button>
            </div>
            <!-- operation default -->
            <div v-else class="operation-list">
              <a-button type="primary" class="u-mr-4 fs-12" @click="onEdit(record)">{{
                $t('common.edit')
              }}</a-button>
              <a-popconfirm
                :title="$t('common.delete_confirm')"
                :ok-text="$t('common.delete')"
                :cancel-text="$t('common.cancel')"
                placement="topLeft"
                @confirm="onDeleteJobCate(record.id)"
              >
                <a-button type="primary" danger class="fs-12">
                  {{ $t('common.delete') }}
                </a-button>
              </a-popconfirm>
            </div>
          </template>
        </template>
      </a-table>

      <!-- modal add record -->
      <modal-add-record v-model:visible="visible" ref="jobCategoryRef" @update="onCreateJobCate">
        <template #default>
          <Field
            v-slot="{ value, handleChange, errorMessage }"
            :name="$t('setting.job_category')"
            v-model="formState.name"
            class="form-group"
            as="div"
            rules="required"
          >
            <div class="form-content">
              <div class="form-input">
                <label class="form-label required">{{ $t('setting.job_category') }}</label>
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
                  <a-checkbox v-model:checked="formState.is_show" />
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
  import { computed, defineComponent, ref, reactive, watch, onMounted } from 'vue';
  import JobCategories from '@/models/JobCategories';
  import { convertPagination, splitNameField } from '@/utils';
  import { usePaginateSetting } from '@/hooks/usePaginateSetting';
  import { pageSizeOptionEnum } from '@/enums/pageSizeOptionEnum';
  import { ModalAddRecord } from '@/components/Modal';
  import { useForm } from 'vee-validate';
  import { cloneDeep, every } from 'lodash-es';
  import { useI18n } from 'vue-i18n';
  import { useHighlight } from '@/hooks/useHighlight';
  import SearchTableJobCategory from './Search/SearchTableJobCategory.vue';
  import { Pagination } from '@/type/pagination';
  import { useWindowSize, useElementSize, useResizeObserver } from '@vueuse/core';
  import { useRoute, useRouter } from 'vue-router';
  import { assign } from 'lodash-es';
  import { useNotification } from '@/hooks/useNotification';

  interface formState {
    name: string;
    is_show: boolean;
  }

  const initPagination = {
    current: 1,
    total: 0,
    pageSize: 20,
    position: 'top',
  };

  const initFormState = {
    name: '',
    is_show: false,
  };

  export default defineComponent({
    name: 'JobCategory',

    components: {
      SearchTableJobCategory,
      ModalAddRecord,
    },

    setup() {
      const formState = ref<formState>(JSON.parse(JSON.stringify(initFormState)));
      const editableData = reactive({});
      const pageSizeOptions = ref<string[]>(pageSizeOptionEnum);
      const pagination = ref<Pagination>(initPagination);
      const dataSource = ref([]);
      const visible = ref<boolean>(false);
      const query = ref<string>('');
      const categoryRef = ref<null>(null);
      const searchRef = ref<null>(null);
      const windowHeight = ref<number>(0);
      const heightSearch = ref<number>(0);
      const loading = ref<boolean>(false);
      const jobCategoryRef = ref();
      const { t } = useI18n();
      const { showTotal } = usePaginateSetting();
      const { errors } = useForm();
      const { highlightText } = useHighlight();
      const { height } = useWindowSize();
      windowHeight.value = height.value;
      const heightCategory = reactive(useElementSize(categoryRef));
      const { onSuccess } = useNotification();

      const columns = computed(() => {
        return [
          {
            title: t('setting.job_category'),
            dataIndex: 'name',
          },
          {
            title: t('setting.show'),
            dataIndex: 'is_show',
          },
          {
            dataIndex: 'operation',
            align: 'center',
          },
        ];
      });

      useResizeObserver(searchRef, (entries) => {
        const entry = entries[0];
        const { height } = entry.contentRect;
        heightSearch.value = height;
      });

      onMounted(() => {
        getListJobCategories();
      });

      watch(visible, (val) => {
        if (!val) {
          console.log('aaa');
          resetFormJobCategory();
        }
      });

      const getListJobCategories = async () => {
        loading.value = true;
        const { data, meta } = await JobCategories.paginate({
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

      const onChangePage = (page) => {
        pagination.value = { ...pagination.value, current: page };
        getListJobCategories();
      };

      const onShowSizeChange = (current: number, pageSize: number) => {
        pagination.value = { ...pagination.value, current, pageSize };
        getListJobCategories();
      };

      const onSearch = (evt) => {
        console.log(evt);
        query.value = evt.search;
      };

      const onCreateJobCate = async () => {
        visible.value = false;
        try {
          await JobCategories.create(formState.value);
          await onSuccess(t('common.msg_success'));
          await getListJobCategories();
        } catch (error) {
          return error;
        }
      };

      const onDeleteJobCate = async (id) => {
        await JobCategories.deleteCategory(id);
        await onSuccess(t('common.msg_deleted'));
        await getListJobCategories();
      };

      const onEdit = (record) => {
        editableData[record.id] = cloneDeep(
          dataSource.value.filter((item: any) => record.id === item.id)[0],
        );
        editableData[record.id]['is_show'] = !!editableData[record.id]['is_show'];
      };

      const onSave = async (id: string) => {
        const valid = every(errors.value, (value: string, key: string) => {
          const splitName = key.split('_')[1];
          return errors.value[`${id}_${splitName}`] !== value;
        });
        if (valid) {
          const data = {
            name: editableData[id]['name'],
            is_show: editableData[id]['is_show'],
          };
          try {
            await JobCategories.updateCategory(id, data);
            await onSuccess(t('common.msg_success'));
            await getListJobCategories();
          } catch (error) {
            return error;
          }
          delete editableData[id];
        }
      };

      const onCancel = (id: string) => {
        delete editableData[id];
      };

      const resetFormJobCategory = () => {
        jobCategoryRef.value.onCancel();
        formState.value = JSON.parse(JSON.stringify(initFormState));
      };

      return {
        pageSizeOptions,
        columns,
        dataSource,
        pagination,
        editableData,
        visible,
        formState,
        query,
        categoryRef,
        searchRef,
        heightCategory,
        heightSearch,
        windowHeight,
        loading,
        jobCategoryRef,
        showTotal,
        onCreateJobCate,
        onChangePage,
        onSearch,
        onEdit,
        onSave,
        onCancel,
        highlightText,
        splitNameField,
        onDeleteJobCate,
        onShowSizeChange,
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

  .job {
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
