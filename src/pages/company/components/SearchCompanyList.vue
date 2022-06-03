<template>
  <a-collapse v-model:activeKey="commonStore.open" :bordered="false" class="custom__collapse">
    <a-collapse-panel key="1">
      <div class="search__form">
        <form @submit.prevent="onSubmit">
          <a-row class="table__row">
            <a-col :sm="24" :md="24" :lg="12" :xl="12">
              <div class="form-group form-staff-list">
                <div class="form-content">
                  <label class="form-label">{{ $t('setting.division') }}</label>

                  <div class="form-select form-staff-list">
                    <a-select
                      v-model:value="form.division"
                      :placeholder="$t('common.please_enter')"
                      :options="useFlgEnum"
                      style="width: 100%"
                    />
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :sm="24" :md="24" :lg="12" :xl="12">
              <div class="form-group form-staff-list">
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
  import { defineComponent, ref } from 'vue';
  import { useFlgEnum } from '@/enums/useFlgEnum';
  import { useForm } from 'vee-validate';
  import { useCommonStore } from '@/store/common';
  import { SearchOutlined } from '@ant-design/icons-vue';

  interface FormState {
    division: string | null;
    search: string;
  }

  const initForm: FormState = {
    division: null,
    search: '',
  };

  export default defineComponent({
    name: 'SearchCompanyList',

    components: { SearchOutlined },

    emits: ['form'],

    setup(_, { emit }) {
      const commonStore = useCommonStore();
      const { handleSubmit, resetForm } = useForm();
      let form = ref(JSON.parse(JSON.stringify(initForm)));

      const onSubmit = handleSubmit(() => {
        const data = { ...form.value };
        // convert dayjs into date
        emit('form', data);
      });

      const clearForm = () => {
        form.value = JSON.parse(JSON.stringify(initForm));
        emit('form', form.value);
        resetForm();
      };
      return {
        commonStore,
        form,
        useFlgEnum,
        onSubmit,
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
