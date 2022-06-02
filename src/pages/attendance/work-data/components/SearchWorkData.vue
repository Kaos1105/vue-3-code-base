<template>
  <a-collapse v-model:activeKey="commonStore.open" :bordered="false" class="custom__collapse">
    <a-collapse-panel key="1">
      <div class="search__form">
        <form @submit.prevent="onSubmit">
          <a-row class="table__row" :gutter="25">
            <!-- date range picker -->
            <a-col :sm="24" :md="24" :lg="12" :xl="12">
              <div class="form-group form-work-data">
                <div class="form-content">
                  <label class="form-label">{{ $t('attendance.day') }}</label>
                  <div class="form-select">
                    <a-range-picker
                      style="width: 100%"
                      v-model:value="dateRange"
                      :ranges="rangeObj"
                      format="YYYY/MM/DD"
                    />
                  </div>
                </div>
              </div>
            </a-col>

            <!-- division and staff select -->
            <a-col :sm="24" :md="24" :lg="12" :xl="12">
              <a-row :gutter="25">
                <a-col :span="12">
                  <div class="form-group form-work-data">
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

                <a-col :span="12">
                  <div class="form-group form-work-data">
                    <div class="form-content">
                      <label class="form-label">{{ $t('attendance.staff') }}</label>

                      <div class="form-select">
                        <a-select
                          v-model:value="form.staff_id"
                          :placeholder="$t('common.please_enter')"
                          :options="enumStaffs"
                          style="width: 100%"
                        />
                      </div>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Search -->
            <a-col :sm="24" :md="24" :lg="12" :xl="12">
              <div class="form-group form-work-data">
                <div class="form-content">
                  <label class="form-label">{{ $t('common.search') }}</label>

                  <div class="form-select">
                    <a-input v-model:value="form.search" :placeholder="$t('common.please_enter')" />
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>

          <div class="search__form--btn">
            <a-button key="back" type="default" @click="clearForm" style="width: 100px"
              >{{ $t('common.cancel') }}
            </a-button>
            <a-button key="submit" type="primary" html-type="submit" style="width: 100px">
              <template #icon>
                <search-outlined />
              </template>
              {{ $t('common.search') }}
            </a-button>
          </div>
        </form>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed } from 'vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { divisionEnum } from '@/enums/divisionEnum';
  import { useForm } from 'vee-validate';
  import { useI18n } from 'vue-i18n';
  import { useCommonStore } from '@/store/common';
  import dayjs, { Dayjs } from 'dayjs';

  type RangeValue = [Dayjs, Dayjs];

  interface FormState {
    start_day: string | Dayjs;
    end_day: string | Dayjs;
    division: string | number;
    staff_id: string;
    search: string;
  }

  const initForm = {
    start_day: '',
    end_day: '',
    division: 1,
    staff_id: 'all',
    search: '',
  };

  export default defineComponent({
    name: 'SearchWorkData',

    components: { SearchOutlined },

    emits: ['form'],

    setup(_, { emit }) {
      const commonStore = useCommonStore();
      const { t } = useI18n();
      const { handleSubmit, resetForm } = useForm();
      let form = ref<FormState>(JSON.parse(JSON.stringify(initForm)));
      const dateRange = ref<RangeValue>();

      const enumStaffs = reactive([
        {
          value: 'all',
          label: '全て',
        },
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

      const onSubmit = handleSubmit(() => {
        const data = { ...form.value };
        // convert dayjs into date
        // data.start_day = dayjs(dateRange.value[0]).format('YYYY-MM-DD');
        // data.end_day = dayjs(dateRange.value[1]).format('YYYY-MM-DD');
        emit('form', data);
      });

      const datePickerKeyValue = computed(() => {
        return [
          {
            id: 1,
            key: t('attendance.today'),
            value: [dayjs(), dayjs()] as RangeValue,
          },
          {
            id: 2,
            key: t('attendance.this_week'),
            value: [dayjs().startOf('week'), dayjs().endOf('week')],
          },
          {
            id: 3,
            key: t('attendance.this_month'),
            value: [dayjs().startOf('month'), dayjs().endOf('month')],
          },
        ];
      });

      const rangeObj = computed(() => {
        let obj = {};
        for (let i = 0; i < datePickerKeyValue.value.length; i++) {
          obj[datePickerKeyValue.value[i].key] = datePickerKeyValue.value[i].value;
        }

        return obj;
      });

      const clearForm = () => {
        form.value = JSON.parse(JSON.stringify(initForm));
        resetForm();
      };

      return {
        commonStore,
        form,
        divisionEnum,
        enumStaffs,
        onSubmit,
        rangeObj,
        dateRange,
        clearForm,
      };
    },
  });
</script>

<style lang="scss">
  span.ant-tag.ant-tag-blue {
    cursor: pointer;
  }
</style>
