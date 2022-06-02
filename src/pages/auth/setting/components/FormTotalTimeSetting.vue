<template>
  <table class="table-form">
    <thead>
      <tr>
        <th>{{ $t('user.total_time_setting') }}</th>
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
                  <tr class="table__row">
                    <td>{{ $t('user.rounding_total_working_hours') }}</td>
                    <a-row>
                      <a-col :lg="12" :xl="12" style="padding-right: 10px">
                        <Field
                          v-slot="{ value, handleChange }"
                          v-model="form.rounding_total_working_hours"
                          name="rounding_total_working_hours"
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
                      </a-col>
                      <a-col :lg="12" :xl="12">
                        <Field
                          v-slot="{ value, handleChange }"
                          v-model="form.rounding_total_working_hours_time"
                          name="rounding_total_working_hours_time"
                          style="display: inline-block; width: 100%"
                          as="td"
                        >
                          <a-form-item>
                            <a-time-picker
                              :value="value"
                              format="mm"
                              value-format="mm"
                              popup-class-name="time-format-mm"
                              @change="handleChange"
                            />
                          </a-form-item>
                        </Field>
                      </a-col>
                    </a-row>
                  </tr>
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
  import dayjs from 'dayjs';

  interface FormState {
    rounding_total_working_hours?: any;
    rounding_total_working_hours_time?: any;
  }

  interface OptionState {
    value: string | number;
    label: string;
  }

  const initState = {
    rounding_total_working_hours: null,
    rounding_total_working_hours_time: null,
  };

  export default defineComponent({
    name: 'FormTotalTimeSetting',

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
        dayjs,
        isCollapse,
        options,
        locale,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .table-form {
    table.table-body {
      tbody {
        .table__row > div:last-child {
          padding-left: 0 !important;
        }
        tr > td:first-child {
          width: 0 !important;
        }
      }
    }
  }
</style>
