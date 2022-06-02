<template>
  <table class="table-form">
    <thead>
      <tr>
        <th>{{ $t('user.time_round_setting') }}</th>
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
                        <td>{{ $t('user.attendance') }}</td>
                        <a-row>
                          <a-col :lg="12" :xl="12" style="padding-right: 10px">
                            <Field
                              v-slot="{ value, handleChange }"
                              v-model="form.attendance"
                              name="attendance"
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
                              v-model="form.attendance_time"
                              name="attendance_time"
                              style="display: inline-block; width: 100%"
                              as="td"
                            >
                              <a-form-item>
                                <a-time-picker
                                  :value="value"
                                  format="mm"
                                  value-format="mm"
                                  popup-class-name="time-format-mm"
                                  style="width: 100%"
                                  @change="handleChange"
                                />
                              </a-form-item>
                            </Field>
                          </a-col>
                        </a-row>
                      </tr>
                      <tr>
                        <td>{{ $t('user.leaving') }}</td>
                        <a-row>
                          <a-col :lg="12" :xl="12" style="padding-right: 10px">
                            <Field
                              v-slot="{ value, handleChange }"
                              v-model="form.leaving"
                              name="leaving"
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
                              v-model="form.leaving_time"
                              name="leaving_time"
                              style="display: inline-block; width: 100%"
                              as="td"
                            >
                              <a-form-item>
                                <a-time-picker
                                  :value="value"
                                  format="mm"
                                  value-format="mm"
                                  popup-class-name="time-format-mm"
                                  style="width: 100%"
                                  @change="handleChange"
                                />
                              </a-form-item>
                            </Field>
                          </a-col>
                        </a-row>
                      </tr>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="12" :xl="12">
                      <tr>
                        <td>{{ $t('user.rest') }}</td>
                        <a-row>
                          <a-col :lg="12" :xl="12" style="padding-right: 10px">
                            <Field
                              v-slot="{ value, handleChange }"
                              v-model="form.rest"
                              name="rest"
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
                              v-model="form.rest_time"
                              name="rest_time"
                              style="display: inline-block; width: 100%"
                              as="td"
                            >
                              <a-form-item>
                                <a-time-picker
                                  :value="value"
                                  format="mm"
                                  value-format="mm"
                                  popup-class-name="time-format-mm"
                                  style="width: 100%"
                                  @change="handleChange"
                                />
                              </a-form-item>
                            </Field>
                          </a-col>
                        </a-row>
                      </tr>
                      <tr>
                        <td>{{ $t('user.end_rest') }}</td>
                        <a-row>
                          <a-col :lg="12" :xl="12" style="padding-right: 10px">
                            <Field
                              v-slot="{ value, handleChange }"
                              v-model="form.end_rest"
                              name="end_rest"
                              style="display: inline-block; width: 100%"
                              as="td"
                            >
                              <a-form-item>
                                <a-select
                                  :value="value"
                                  :placeholder="$t('common.please_enter')"
                                  w
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
                              v-model="form.end_rest_time"
                              name="end_rest_time"
                              style="display: inline-block; width: 100%"
                              as="td"
                            >
                              <a-form-item>
                                <a-time-picker
                                  :value="value"
                                  format="mm"
                                  value-format="mm"
                                  popup-class-name="time-format-mm"
                                  style="width: 100%"
                                  @change="handleChange"
                                />
                              </a-form-item>
                            </Field>
                          </a-col>
                        </a-row>
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
  import { splitNameField } from '@/utils';

  interface FormState {
    attendance?: any;
    attendance_time?: any;
    leaving?: any;
    leaving_time: any;
    rest?: any;
    rest_time?: any;
    end_rest?: any;
    end_rest_time?: any;
  }

  interface OptionState {
    value: string | number;
    label: string;
  }

  const initState = {
    attendance: null,
    attendance_time: null,
    leaving: null,
    leaving_time: null,
    rest: null,
    rest_time: null,
    end_rest: null,
    end_rest_time: null,
  };

  export default defineComponent({
    name: 'FormTimeRoundSetting',

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
        splitNameField,
      };
    },
  });
</script>
