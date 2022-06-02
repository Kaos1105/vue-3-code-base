<template>
  <a-collapse v-model:activeKey="commonStore.open" :bordered="false" class="custom__collapse">
    <a-collapse-panel key="1">
      <div class="search__form u-mt-0">
        <form @submit.prevent="onSubmit">
          <a-row class="table__row">
            <!-- year -->
            <a-col :sm="24" :md="24" :lg="12" :xl="12">
              <div class="form-group form-search-calendar">
                <div class="form-content">
                  <label class="form-label">{{ $t('common.year') }}</label>

                  <div class="form-select">
                    <a-date-picker v-model:value="form.year" picker="year" style="width: 100%" />
                  </div>
                </div>
              </div>
            </a-col>
            <!-- Search -->
            <a-col :sm="24" :md="24" :lg="12" :xl="12">
              <div class="form-group form-work-data">
                <div class="form-content">
                  <label class="form-label">{{ $t('common.search') }}</label>

                  <div class="form-select">
                    <a-input v-model:value="form.search" />
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
  import { defineComponent, ref } from 'vue';
  import { useForm } from 'vee-validate';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { useCommonStore } from '@/store/common';
  import dayjs, { Dayjs } from 'dayjs';

  interface FormState {
    year: string | null | Dayjs;
    search: string;
  }

  const initForm: FormState = {
    year: null,
    search: '',
  };

  export default defineComponent({
    name: 'SearchTableCalendar',

    components: { SearchOutlined },

    emits: ['form'],

    setup(_, { emit }) {
      const commonStore = useCommonStore();
      const { handleSubmit, resetForm } = useForm();
      let form = ref(JSON.parse(JSON.stringify(initForm)));
      const isOpen = ref(false);

      const onSubmit = handleSubmit(() => {
        const data = { ...form.value };
        data.year = data.year ? dayjs(data.year).format('YYYY') : data.year;
        emit('form', data);
      });

      const clearForm = () => {
        form.value = JSON.parse(JSON.stringify(initForm));
        emit('form', form.value);
        resetForm();
      };

      const onOpenChange = (open: boolean) => {
        console.log(open);
        isOpen.value = open;
      };

      const onPaneChange = (val: Dayjs) => {
        form.value.year = val;
        isOpen.value = false;
      };

      return {
        commonStore,
        form,
        isOpen,
        onSubmit,
        onOpenChange,
        onPaneChange,
        clearForm,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .table__row {
    > div:not(.form-group):first-child {
      padding-right: 15px;
      @media screen and (max-width: 991px) {
        padding-right: 0;
      }
    }
  }
</style>
