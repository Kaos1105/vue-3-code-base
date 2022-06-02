<template>
  <a-modal
    v-model:visible="isVisible"
    :title="$t('attendance.multiple_export')"
    width="100%"
    wrapClassName="full-modal"
    @cancel="onCancel"
  >
    <div class="card-common">
      <form @submit.prevent="onSubmit">
        <a-row :gutter="25">
          <a-col :span="8">
            <!-- month -->
            <div class="form-group">
              <div class="form-content">
                <label class="form-label">{{ $t('attendance.month') }}</label>
                <div class="form-select">
                  <a-month-picker style="width: 100%" format="YYYY/MM" v-model:value="form.month" />
                </div>
              </div>
            </div>
          </a-col>
          <a-col :span="8">
            <!-- division -->
            <div class="form-group">
              <div class="form-content">
                <label class="form-label">{{ $t('attendance.division') }}</label>

                <div class="form-select">
                  <a-select
                    v-model:value="form.division"
                    :placeholder="$t('common.please_enter')"
                    :options="divisionEnum"
                    style="width: 100%"
                  />
                </div>
              </div>
            </div>
          </a-col>
          <a-col :span="8">
            <!-- staff -->
            <div class="form-group">
              <div class="form-content">
                <label class="form-label">{{ $t('attendance.staff') }}</label>

                <div class="form-select">
                  <a-select
                    v-model:value="form.staff_id"
                    :placeholder="$t('common.please_enter')"
                    mode="multiple"
                    :options="enumStaffs"
                    style="width: 100%"
                  />
                </div>
              </div>
            </div>
          </a-col>
          <a-col :span="24" class="form-btn">
            <a-button key="submit" type="primary" html-type="submit" style="width: 100px">
              {{ $t('common.search') }}
            </a-button>
            <a-button type="primary" style="width: 100px">
              {{ $t('attendance.export') }}
            </a-button>
          </a-col>
        </a-row>
      </form>

      <a-table
        id="list-table"
        class="table__csv"
        style="margin-top: 2rem"
        :columns="columns"
        :data-source="dataSource"
        :row-key="(record) => record.id"
        :pagination="false"
        :show-sorter-tooltip="false"
        :scroll="{ x: 2000, y: 400 }"
        size="middle"
        bordered
      />
    </div>
    <template #footer>
      <a-button key="back" type="default" @click="onCancel">{{ $t('common.cancel') }}</a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, toRefs, reactive, computed, onBeforeMount } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { divisionEnum } from '@/enums/divisionEnum';
  import { useForm } from 'vee-validate';
  import { useI18n } from 'vue-i18n';

  import { renderTimecard1 } from '@/faker/timecard';

  interface FormState {
    month: string | Dayjs | null;
    division: string | number;
    staff_id: any;
  }

  const initForm = {
    month: null,
    division: 1,
    staff_id: ['abc'],
  };

  export default defineComponent({
    name: 'ModalMultipleExport',

    props: {
      visible: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
    },

    emits: ['update:visible'],

    setup(props, { emit }) {
      const { t } = useI18n();
      const { handleSubmit, resetForm } = useForm();
      const { visible: isVisible } = toRefs(props);

      let form = ref<FormState>(JSON.parse(JSON.stringify(initForm)));
      const dataSource = ref<any[]>([]);
      const enumStaffs = reactive([
        {
          value: 'abc',
          label: 'Staff 1',
        },
        {
          value: 'abd',
          label: 'Staff 2',
        },
        {
          value: 'abe',
          label: 'Staff 3',
        },
      ]);

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
            dataIndex: 'user_id',
            key: 'user_id',
            sorter: true,
            fixed: 'left',
          },
          {
            title: '2022年03月',
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

      const onSubmit = handleSubmit(() => {
        const data = { ...form.value };
        // convert dayjs into date
        data.month = dayjs(form.value.month).format('YYYY-MM');
        console.log(data);
      });

      const onCancel = () => {
        emit('update:visible', false);
        form.value = JSON.parse(JSON.stringify(initForm));
        resetForm();
      };

      onBeforeMount(() => {
        const timecard1 = renderTimecard1(20);

        dataSource.value = timecard1.result.data;
      });

      return {
        enumStaffs,
        form,
        divisionEnum,
        columns,
        dataSource,
        isVisible,
        onSubmit,
        onCancel,
      };
    },
  });
</script>
<style lang="scss">
  .full-modal {
    .ant-modal {
      max-width: 100%;
      top: 0;
      padding-bottom: 0;
      margin: 0;
    }
    .ant-modal-content {
      display: flex;
      flex-direction: column;
      height: calc(100vh);
    }
    .ant-modal-body {
      flex: 1;
    }

    .card-common {
      padding: 0;
    }
  }

  .table__csv {
    .ant-table-body {
      max-height: 100% !important;
      height: calc(100vh - 366px);
    }
  }

  .form-btn {
    display: flex;
    justify-content: end;
    margin-top: 1rem;

    .ant-btn-primary {
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      align-self: flex-end;
    }
  }
</style>
