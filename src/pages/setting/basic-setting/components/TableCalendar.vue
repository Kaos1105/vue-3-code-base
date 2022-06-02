<template>
  <div class="calendar">
    <search-table-calendar @form="onSearch" ref="searchRef" />

    <div class="calendar__options" ref="calendarRef">
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

    <div class="calendar__table">
      <a-table
        id="list-table"
        :columns="columns"
        :data-source="dataSource"
        :row-key="(record) => record.id"
        :pagination="false"
        :show-sorter-tooltip="false"
        :scroll="{ x: 1055, y: windowHeight - heightCalendar.height - heightSearch - 190 }"
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
          <template v-if="column.dataIndex === 'date'">
            <template v-if="editableData[record.id]">
              <form @submit.prevent>
                <Field
                  v-slot="{ value, handleChange, errorMessage }"
                  v-model="editableData[record.id]['date']"
                  :name="`${record.id}_${$t('setting.date')}`"
                  class="form-group"
                  rules="required"
                >
                  <div class="form-content">
                    <a-form-item
                      :help="splitNameField(errorMessage, `${record.id}_`)"
                      :validate-status="errorMessage ? 'error' : undefined"
                    >
                      <a-date-picker
                        :value="value"
                        :inputReadOnly="true"
                        :showToday="false"
                        format="YYYY/MM/DD"
                        @update:value="handleChange"
                      />
                    </a-form-item>
                  </div>
                </Field>
              </form>
            </template>
            <template v-else>
              <span v-html="highlightText(dayjs(text).format('YYYY/MM/DD'), query)"></span>
            </template>
          </template>

          <template v-if="column.dataIndex === 'all'">
            <template v-if="editableData[record.id]">
              <a-checkbox v-model:checked="editableData[record.id]['all']" />
            </template>
            <template v-else>
              <a-checkbox :checked="record.all" />
            </template>
          </template>

          <template v-if="column.dataIndex === 'holiday'">
            <template v-if="editableData[record.id]">
              <a-checkbox v-model:checked="editableData[record.id]['holiday']" />
            </template>
            <template v-else>
              <a-checkbox :checked="record.holiday" />
            </template>
          </template>

          <template v-if="column.dataIndex === 'dayoff_payment'">
            <template v-if="editableData[record.id]">
              <a-checkbox v-model:checked="editableData[record.id]['dayoff_payment']" />
            </template>
            <template v-else>
              <a-checkbox :checked="record.dayoff_payment" />
            </template>
          </template>

          <template v-if="column.dataIndex === 'create_date'">
            <span v-html="highlightText(dayjs(text).format('YYYY/MM/DD HH:mm:ss'), query)"></span>
          </template>

          <template v-if="column.dataIndex === 'note'">
            <template v-if="editableData[record.id]">
              <a-input v-model:value="editableData[record.id]['note']" />
            </template>
            <template v-else>
              <span v-html="highlightText(text, query)"></span>
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
      <modal-add-record v-model:visible="visible" @update="onAddRecord">
        <template #default>
          <Field
            v-slot="{ value, handleChange, errorMessage }"
            :name="$t('setting.date')"
            v-model="formState.date"
            class="form-group"
            as="div"
            rules="required"
          >
            <div class="form-content">
              <div class="form-input">
                <label class="form-label required">{{ $t('setting.date') }}</label>
                <a-form-item
                  :help="errorMessage"
                  :validate-status="errorMessage ? 'error' : undefined"
                >
                  <a-date-picker
                    :value="value"
                    :inputReadOnly="true"
                    :showToday="false"
                    format="YYYY/MM/DD"
                    @update:value="handleChange"
                  />
                </a-form-item>
              </div>
            </div>
          </Field>
          <!-- note -->
          <div class="form-group">
            <div class="form-content">
              <div class="form-input">
                <label class="form-label">{{ $t('setting.note') }}</label>
                <a-form-item>
                  <a-input v-model:value="formState.note" />
                </a-form-item>
              </div>
            </div>
          </div>
          <!-- all -->
          <div class="form-group">
            <div class="form-content">
              <div class="form-input">
                <label class="form-label">{{ $t('setting.all') }}</label>
                <a-form-item>
                  <a-checkbox v-model:checked="formState.all" />
                </a-form-item>
              </div>
            </div>
          </div>
          <!-- holiday -->
          <div class="form-group">
            <div class="form-content">
              <div class="form-input">
                <label class="form-label">{{ $t('setting.holiday') }}</label>
                <a-form-item>
                  <a-checkbox v-model:checked="formState.holiday" />
                </a-form-item>
              </div>
            </div>
          </div>
          <!-- dayoff payment -->
          <div class="form-group">
            <div class="form-content">
              <div class="form-input">
                <label class="form-label">{{ $t('setting.day_off_payment') }}</label>
                <a-form-item>
                  <a-checkbox v-model:checked="formState.dayoff_payment" />
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
  import { computed, defineComponent, onBeforeMount, ref, reactive } from 'vue';
  import { renderCalendar } from '@/faker/calendar';
  import { convertPagination, splitNameField } from '@/utils';
  import { usePaginateSetting } from '@/hooks/usePaginateSetting';
  import { pageSizeOptionEnum } from '@/enums/pageSizeOptionEnum';
  import { ModalAddRecord } from '@/components/Modal';
  import { useForm } from 'vee-validate';
  import { cloneDeep, every } from 'lodash-es';
  import { useI18n } from 'vue-i18n';
  import { useHighlight } from '@/hooks/useHighlight';
  import SearchTableCalendar from './Search/SearchTableCalendar.vue';
  import { Pagination } from '@/type/pagination';
  import { useWindowInner } from '@/hooks/useWindowInner';
  import dayjs, { Dayjs } from 'dayjs';
  import { useWindowSize, useElementSize, useResizeObserver } from '@vueuse/core';

  const initPagination = {
    current: 0,
    total: 0,
    pageSize: 0,
    position: 'top',
  };

  interface formState {
    date: string | null | Dayjs;
    all: boolean;
    holiday: boolean;
    dayoff_payment: string | null | Dayjs;
    note: string;
  }

  export default defineComponent({
    name: 'Calendar',

    components: {
      SearchTableCalendar,
      ModalAddRecord,
    },

    setup() {
      const query = ref<string>('');
      const calendarRef = ref<null>(null);
      const searchRef = ref<null>(null);
      const windowHeight = ref<number>(0);
      const heightSearch = ref<number>(0);

      const { t } = useI18n();
      const { showTotal } = usePaginateSetting();
      const { errors } = useForm();
      const { innerHeight } = useWindowInner();
      const { highlightText } = useHighlight();
      const { height } = useWindowSize();
      windowHeight.value = height.value;
      const heightCalendar = reactive(useElementSize(calendarRef));

      const formState = ref<formState>({
        date: null,
        all: false,
        holiday: false,
        dayoff_payment: null,
        note: '',
      });
      const editableData = reactive({});
      const pageSizeOptions = ref<string[]>(pageSizeOptionEnum);
      const pagination = ref<Pagination>(initPagination);
      const dataSource = ref<any[]>([]);
      const visible = ref<boolean>(false);

      const columns = computed(() => {
        return [
          {
            title: t('setting.date'),
            dataIndex: 'date',
          },
          {
            title: t('setting.all'),
            dataIndex: 'all',
          },
          {
            title: t('setting.holiday'),
            dataIndex: 'holiday',
          },
          {
            title: t('setting.day_off_payment'),
            dataIndex: 'dayoff_payment',
          },
          {
            title: t('setting.create_date'),
            dataIndex: 'create_date',
          },
          {
            title: t('setting.note'),
            dataIndex: 'note',
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

      onBeforeMount(() => {
        const { result } = renderCalendar(20);
        dataSource.value = result.data;
        pagination.value = { ...convertPagination(result.meta) };
      });

      const onSearch = (evt) => {
        console.log(evt);
        query.value = evt.search;
      };

      const onChangePage = (page) => {
        pagination.value = { ...pagination.value, current: page };
      };

      const onAddRecord = () => {
        console.log(formState.value);
      };

      const onEdit = (record) => {
        editableData[record.id] = cloneDeep(
          dataSource.value.filter((item: any) => record.id === item.id)[0],
        );
      };

      const onSave = (id: string) => {
        const valid = every(errors.value, (value: string, key: string) => {
          const splitName = key.split('_')[1];
          return errors.value[`${id}_${splitName}`] !== value;
        });

        if (valid) {
          Object.assign(
            dataSource.value.filter((item: any) => id === item.id)[0],
            editableData[id],
          );
          delete editableData[id];
        }
      };

      const onCancel = (id: string) => {
        delete editableData[id];
      };

      return {
        pageSizeOptions,
        columns,
        dataSource,
        pagination,
        innerHeight,
        editableData,
        visible,
        formState,
        query,
        calendarRef,
        searchRef,
        heightCalendar,
        heightSearch,
        windowHeight,
        dayjs,
        showTotal,
        onAddRecord,
        onChangePage,
        onEdit,
        onSave,
        onCancel,
        onSearch,
        highlightText,
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

  .calendar {
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
