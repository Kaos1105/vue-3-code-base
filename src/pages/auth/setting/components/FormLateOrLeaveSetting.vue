<template>
  <table class="table-form">
    <thead>
      <tr>
        <th>{{ $t('user.late_leave_setting') }}</th>
        <th>
          <div class="table-form__buttons">
            <down-outlined
              :class="['table-form__arrow-icon', isCollapse && 'isCollapse']"
              @click="isCollapse = !isCollapse"
            />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="2" style="padding: 0">
          <a-collapse
            :active-key="isCollapse ? [] : [1]"
            :bordered="false"
            class="table-form__collapse"
          >
            <a-collapse-panel key="1">
              <table class="table-body">
                <tbody>
                  <a-row class="table__row">
                    <a-col :sm="24" :md="24" :lg="12" :xl="12">
                      <tr>
                        <td>{{ $t('user.late') }}</td>
                        <Field
                          v-slot="{ value, handleChange }"
                          v-model="form.late"
                          name="late"
                          style="display: inline-block; width: 100%"
                          as="td"
                        >
                          <a-form-item>
                            <a-select
                              :value="value"
                              :placeholder="$t('common.please_enter')"
                              :options="options"
                              style="width: 100%"
                              @change="handleChange"
                            />
                          </a-form-item>
                        </Field>
                      </tr>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="12" :xl="12">
                      <tr>
                        <td>{{ $t('user.leave_early') }}</td>
                        <Field
                          v-slot="{ value, handleChange }"
                          v-model="form.leave_early"
                          name="leave_early"
                          style="display: inline-block; width: 100%"
                          as="td"
                        >
                          <a-form-item>
                            <a-select
                              :value="value"
                              :placeholder="$t('common.please_enter')"
                              :options="options"
                              style="width: 100%"
                              @change="handleChange"
                            />
                          </a-form-item>
                        </Field>
                      </tr>
                    </a-col>
                  </a-row>
                </tbody>
              </table>
            </a-collapse-panel>
          </a-collapse>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, ref, watch } from 'vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';

  interface FormState {
    late?: any;
    leave_early?: any;
  }

  interface OptionState {
    value: string | number;
    label: string;
  }

  const initState = {
    late: null,
    leave_early: null,
  };

  export default defineComponent({
    name: 'FormLateOrLeaveSetting',

    components: {
      DownOutlined,
    },

    emits: ['form-setting'],

    setup(_, { emit }) {
      const { t } = useI18n();
      const isCollapse = ref(true);
      let form = reactive<FormState>(initState);

      const { locale } = useI18n();

      const options = computed<OptionState[]>(() => {
        return [
          {
            value: 1,
            label: t('user.double_zero'),
          },
          {
            value: 2,
            label: t('user.round_up'),
          },
          {
            value: 3,
            label: t('user.truncate'),
          },
        ];
      });

      watch(form, (val) => {
        emit('form-setting', val);
      });

      return {
        form,
        isCollapse,
        options,
        locale,
      };
    },
  });
</script>

<style lang="scss"></style>
