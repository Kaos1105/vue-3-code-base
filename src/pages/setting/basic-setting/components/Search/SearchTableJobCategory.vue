<template>
  <a-collapse v-model:activeKey="commonStore.open" :bordered="false" class="custom__collapse">
    <a-collapse-panel key="1">
      <div class="search__form u-mt-0">
        <form @submit.prevent="onSubmit">
          <a-row class="table__row">
            <div class="form-group">
              <div class="form-content">
                <label class="form-label">{{ $t('common.search') }}</label>

                <div class="form-select">
                  <a-input v-model:value="form.search" :placeholder="$t('common.please_enter')" />
                </div>
              </div>
            </div>
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

  interface FormState {
    search: any;
  }

  const initForm: FormState = {
    search: '',
  };

  export default defineComponent({
    name: 'SearchTableJobCategory',

    components: { SearchOutlined },

    emits: ['form'],

    setup(_, { emit }) {
      const commonStore = useCommonStore();
      const { handleSubmit, resetForm } = useForm();
      let form = ref(JSON.parse(JSON.stringify(initForm)));

      const onSubmit = handleSubmit(() => {
        const data = { ...form.value };
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
        onSubmit,
        clearForm,
      };
    },
  });
</script>
