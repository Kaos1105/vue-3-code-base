<template>
  <div>
    <a-collapse v-model:activeKey="commonStore.open" :bordered="false" class="custom__collapse">
      <a-collapse-panel key="1">
        <div class="search__form">
          <form @submit.prevent="onSubmit">
            <a-row class="table__row">
              <a-col :sm="24" :md="24" :lg="8" :xl="8">
                <div class="form-group form-report">
                  <div class="form-content">
                    <label class="form-label">{{ $t('attendance.year') }}</label>

                    <div class="form-select">
                      <a-date-picker v-model:value="form.year" picker="year" style="width: 100%" />
                    </div>
                  </div>
                </div>
              </a-col>

              <a-col :sm="24" :md="24" :lg="8" :xl="8">
                <div class="form-group form-report">
                  <div class="form-content">
                    <label class="form-label">{{ $t('attendance.division') }}</label>

                    <div class="form-select">
                      <a-select
                        v-model:value="form.division"
                        :placeholder="$t('common.please_enter')"
                        :options="DIVISION_ENUM"
                        style="width: 100%"
                      />
                    </div>
                  </div>
                </div>
              </a-col>

              <a-col :sm="24" :md="24" :lg="8" :xl="8">
                <div class="form-group form-report">
                  <div class="form-content">
                    <label class="form-label">{{ $t('attendance.staff') }}</label>

                    <div class="form-select">
                      <a-select
                        v-model:value="form.staff"
                        :placeholder="$t('common.please_enter')"
                        :options="staffEnum"
                        style="width: 100%"
                      />
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
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue';
  import { divisionEnum } from '@/enums/divisionEnum';
  import { useForm } from 'vee-validate';
  import { useCommonStore } from '@/store/common';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import dayjs, { Dayjs } from 'dayjs';

  interface FormState {
    year: string | null | Dayjs;
    division: string | number | null;
    staff: string | number | null;
  }

  const initForm = {
    year: null,
    division: 2,
    staff: 0,
  };

  const DIVISION_ENUM = divisionEnum.slice(1);

  export default defineComponent({
    name: 'SearchYearlyReport',

    components: { SearchOutlined },

    emits: ['form'],

    setup(_, { emit }) {
      const form = ref<FormState>(JSON.parse(JSON.stringify(initForm)));
      form.value.year = dayjs();

      const commonStore = useCommonStore();
      const { handleSubmit, resetForm } = useForm();
      const isOpen = ref(false);

      const staffEnum = computed(() => {
        return [
          {
            value: 0,
            label: '全て',
          },
          {
            value: 1,
            label: '加藤　武人 (0000001)',
          },
          {
            value: 2,
            label: '加藤　薫子 (0000002)',
          },
          {
            value: 3,
            label: '鵜飼　ひとみ (0000051)',
          },
        ];
      });

      onMounted(() => {
        onHandleData(form.value);
      });

      const onSubmit = handleSubmit(() => {
        onHandleData(form.value);
      });

      const clearForm = () => {
        form.value = JSON.parse(JSON.stringify(initForm));
        onHandleData(form.value);
        resetForm();
      };

      const onHandleData = (form) => {
        const data = { ...form };
        data.year = dayjs(data.year).format('YYYY');
        emit('form', data);
      };

      const onOpenChange = (status) => {
        isOpen.value = status;
      };

      const onPaneChange = (value: Dayjs) => {
        form.value.year = value;
        isOpen.value = false;
      };

      return {
        commonStore,
        form,
        DIVISION_ENUM,
        staffEnum,
        isOpen,
        onSubmit,
        clearForm,
        onOpenChange,
        onPaneChange,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .table__row {
    > div:not(.form-group):nth-child(1),
    > div:not(.form-group):nth-child(2) {
      padding-right: 15px;
      @media screen and (max-width: 991px) {
        padding-right: 0;
      }
    }
  }
</style>
