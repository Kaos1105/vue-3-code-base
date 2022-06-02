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
                  <label class="form-label">{{ $t('attendance.month') }}</label>
                  <div class="form-select">
                    <a-month-picker
                      style="width: 100%"
                      format="YYYY/MM"
                      v-model:value="form.month"
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
  import { defineComponent, ref, reactive } from 'vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { divisionEnum } from '@/enums/divisionEnum';
  import { useForm } from 'vee-validate';
  import dayjs, { Dayjs } from 'dayjs';
  import { useCommonStore } from '@/store/common';

  interface FormState {
    month: string | Dayjs | null;
    division: string | number;
    staff_id: string;
  }

  const initForm = {
    month: '',
    division: 1,
    staff_id: 'all',
  };

  export default defineComponent({
    name: 'SearchTimeCard',

    components: { SearchOutlined },

    emits: ['form'],

    setup(_, { emit }) {
      const commonStore = useCommonStore();
      const { handleSubmit, resetForm } = useForm();
      let form = ref<FormState>(JSON.parse(JSON.stringify(initForm)));

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
        data.month = dayjs(form.value.month).format('YYYY-MM');
        emit('form', data);
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
        clearForm,
      };
    },
  });
</script>

<style></style>
