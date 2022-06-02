<template>
  <table class="table-form form-bs-setting">
    <thead>
      <tr>
        <th>{{ $t('user.basic_setting') }}</th>
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
                      <!-- company name -->
                      <Field
                        v-slot="{ value, handleChange, errorMessage }"
                        v-model="form.company_name"
                        :name="$t('user.company_name')"
                        as="tr"
                        rules="required"
                      >
                        <td class="required">{{ $t('user.company_name') }}</td>
                        <td>
                          <a-form-item
                            :help="errorMessage"
                            :validate-status="errorMessage ? 'error' : undefined"
                          >
                            <a-input
                              :value="value"
                              :placeholder="$t('common.please_enter')"
                              @change="handleChange"
                            />
                          </a-form-item>
                        </td>
                      </Field>
                      <!-- introduce -->
                      <Field
                        v-slot="{ value, handleChange, errorMessage }"
                        v-model="form.introduce"
                        :name="$t('user.introduce')"
                        as="tr"
                      >
                        <td>{{ $t('user.introduce') }}</td>
                        <td>
                          <a-form-item
                            :help="errorMessage"
                            :validate-status="errorMessage ? 'error' : undefined"
                            style="margin-bottom: 24px; height: auto"
                          >
                            <a-textarea
                              :value="value"
                              :placeholder="$t('common.please_enter')"
                              :rows="3"
                              @change="handleChange"
                            />
                          </a-form-item>
                        </td>
                      </Field>
                      <!-- shift management person -->
                      <Field
                        v-slot="{ value, handleChange, errorMessage }"
                        v-model="form.shift_management_person"
                        :name="$t('user.shift_management_person')"
                        as="tr"
                        rules="required"
                      >
                        <td class="required">{{ $t('user.shift_management_person') }}</td>
                        <td>
                          <a-form-item
                            :help="errorMessage"
                            :validate-status="errorMessage ? 'error' : undefined"
                          >
                            <a-input
                              :value="value"
                              :placeholder="$t('common.please_enter')"
                              @change="handleChange"
                            />
                          </a-form-item>
                        </td>
                      </Field>
                      <!-- email -->
                      <Field
                        v-slot="{ value, handleChange, errorMessage }"
                        :name="$t('user.email')"
                        as="tr"
                        rules="required|email"
                      >
                        <td class="required">{{ $t('user.email') }}</td>
                        <td>
                          <a-form-item
                            :help="errorMessage"
                            :validate-status="errorMessage ? 'error' : undefined"
                          >
                            <a-input
                              :value="value"
                              :placeholder="$t('common.please_enter')"
                              @change="handleChange"
                            />
                          </a-form-item>
                        </td>
                      </Field>
                      <!-- phone -->
                      <Field
                        v-slot="{ value, handleChange, errorMessage }"
                        v-model="form.phone"
                        :name="$t('user.phone')"
                        as="tr"
                        rules="phone"
                      >
                        <td>{{ $t('user.phone') }}</td>
                        <td>
                          <a-form-item
                            :help="errorMessage"
                            :validate-status="errorMessage ? 'error' : undefined"
                          >
                            <a-input
                              :value="value"
                              :placeholder="$t('common.please_enter')"
                              @change="handleChange"
                            />
                          </a-form-item>
                        </td>
                      </Field>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="12" :xl="12">
                      <!-- fax -->
                      <Field
                        v-slot="{ value, handleChange, errorMessage }"
                        v-model="form.fax"
                        :name="`${locale}${$t('user.fax')}`"
                        as="tr"
                        rules="fax"
                      >
                        <td>{{ $t('user.fax') }}</td>
                        <td>
                          <a-form-item
                            :help="splitNameField(errorMessage, locale)"
                            :validate-status="errorMessage ? 'error' : undefined"
                          >
                            <a-input
                              :value="value"
                              :placeholder="$t('common.please_enter')"
                              @change="handleChange"
                            />
                          </a-form-item>
                        </td>
                      </Field>
                      <!-- closing month -->
                      <Field
                        v-slot="{ value, errorMessage }"
                        v-model="form.closing_month"
                        :name="$t('user.closing_month')"
                        as="tr"
                      >
                        <td>{{ $t('user.closing_month') }}</td>
                        <td>
                          <a-form-item
                            :help="errorMessage"
                            :validate-status="errorMessage ? 'error' : undefined"
                          >
                            <a-date-picker
                              picker="month"
                              :value="value"
                              format="MM"
                              dropdownClassName="hide__props"
                              style="width: 100%"
                              @change="onSelectMonth"
                            />
                          </a-form-item>
                        </td>
                      </Field>
                      <!-- closing date -->
                      <Field
                        v-slot="{ value, errorMessage }"
                        v-model="form.closing_date"
                        :name="$t('user.closing_date')"
                        as="tr"
                      >
                        <td>{{ $t('user.closing_date') }}</td>
                        <td>
                          <a-form-item
                            :help="errorMessage"
                            :validate-status="errorMessage ? 'error' : undefined"
                          >
                            <a-date-picker
                              :value="value"
                              :disabled-date="disabledDate"
                              :allowClear="false"
                              :showToday="false"
                              dropdownClassName="hide__props"
                              format="DD"
                              style="width: 100%"
                              @change="onSelectDate"
                            />
                          </a-form-item>
                        </td>
                      </Field>
                      <!-- date delimited time -->
                      <Field
                        v-slot="{ value, handleChange }"
                        v-model="form.date_delimited_time"
                        :name="$t('user.date_delimited_time')"
                        as="tr"
                      >
                        <td>{{ $t('user.date_delimited_time') }}</td>
                        <td>
                          <a-form-item>
                            <a-time-picker
                              :value="value"
                              format="HH:mm"
                              value-format="HH:mm"
                              style="width: 100%"
                              @change="handleChange"
                            />
                          </a-form-item>
                        </td>
                      </Field>
                      <!-- standard working hours -->
                      <tr>
                        <td class="required">{{ $t('user.standard_working_hours') }}</td>
                        <a-row>
                          <a-col :lg="12" :xl="12" style="padding-right: 10px">
                            <Field
                              v-slot="{ value, handleChange, errorMessage }"
                              v-model="form.standard_working_hours_from"
                              :name="`from${$t('user.standard_working_hours')}`"
                              as="td"
                              style="display: inline-block; width: 100%"
                              rules="required"
                            >
                              <a-form-item
                                :help="splitNameField(errorMessage, 'from')"
                                :validate-status="errorMessage ? 'error' : undefined"
                              >
                                <a-time-picker
                                  :value="value"
                                  :minute-step="30"
                                  :disabledHours="
                                    () => onDisabledHours(form.standard_working_hours_to, 'from')
                                  "
                                  format="HH:mm"
                                  style="width: 100%"
                                  @change="handleChange"
                                />
                              </a-form-item>
                            </Field>
                          </a-col>
                          <a-col :lg="12" :xl="12">
                            <Field
                              v-slot="{ value, handleChange, errorMessage }"
                              v-model="form.standard_working_hours_to"
                              :name="`to${$t('user.standard_working_hours')}`"
                              as="td"
                              style="display: inline-block; width: 100%"
                              rules="required"
                            >
                              <a-form-item
                                :help="splitNameField(errorMessage, 'to')"
                                :validate-status="errorMessage ? 'error' : undefined"
                              >
                                <a-time-picker
                                  :value="value"
                                  :minute-step="30"
                                  :disabledHours="
                                    () => onDisabledHours(form.standard_working_hours_from, 'to')
                                  "
                                  format="HH:mm"
                                  style="width: 100%"
                                  @change="handleChange"
                                />
                              </a-form-item>
                            </Field>
                          </a-col>
                        </a-row>
                      </tr>
                      <!-- scheduled working hours -->
                      <Field
                        v-slot="{ value, handleChange }"
                        v-model="form.scheduled_working_hours"
                        :name="$t('user.scheduled_working_hours')"
                        as="tr"
                      >
                        <td>{{ $t('user.scheduled_working_hours') }}</td>
                        <td>
                          <a-form-item>
                            <a-time-picker
                              :value="value"
                              format="HH:mm"
                              value-format="HH:mm"
                              style="width: 100%"
                              @change="handleChange"
                            />
                          </a-form-item>
                        </td>
                      </Field>
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
  import dayjs, { Dayjs } from 'dayjs';
  import { useI18n } from 'vue-i18n';
  import { splitNameField } from '@/utils';

  interface FormState {
    company_name: string;
    introduce: string;
    shift_management_person: string;
    email: string;
    phone: string | number;
    fax: string | number;
    closing_month: Dayjs | string | null;
    closing_date: Dayjs | string | null;
    date_delimited_time: Dayjs | string | null;
    standard_working_hours_from: Dayjs | string | null;
    standard_working_hours_to: Dayjs | string | null;
    scheduled_working_hours: Dayjs | string | null;
  }

  interface OptionState {
    value: string | number;
    label: string;
  }

  const initState = {
    company_name: '',
    introduce: '',
    shift_management_person: '',
    email: '',
    phone: '',
    fax: '',
    closing_month: null,
    closing_date: null,
    date_delimited_time: null,
    standard_working_hours_from: null,
    standard_working_hours_to: null,
    scheduled_working_hours: null,
  };

  export default defineComponent({
    name: 'FormBasicSetting',

    components: {
      DownOutlined,
    },

    emits: ['form-setting'],

    setup(_, { emit }) {
      const { t } = useI18n();
      const isCollapse = ref();
      const { locale } = useI18n();

      let form = reactive<FormState>(initState);

      const options = computed<OptionState[]>(() => {
        return [
          {
            value: 1,
            label: t('user.standard'),
          },
          {
            value: 2,
            label: t('user.monthly'),
          },
          {
            value: 3,
            label: t('user.weekly'),
          },
          {
            value: 4,
            label: t('user.individual'),
          },
        ];
      });

      watch(form, (val) => {
        emit('form-setting', val);
      });

      const onSelectMonth = (value: Dayjs) => {
        form.closing_month = value;
        form.closing_date = value ? form.closing_month.startOf('month') : null;
      };

      const onSelectDate = (value: Dayjs) => {
        form.closing_date = value;
      };

      const disabledDate = (current: Dayjs) => {
        const date = form.closing_date !== null ? dayjs(form.closing_date) : dayjs();
        // Can not select days before start date and end date
        return current < date.startOf('month') || current > date.endOf('month');
      };

      const onDisabledHours = (_time, type: string) => {
        // type = 'from' or 'to'
        if (_time) {
          const time = +dayjs(_time).format('HH');
          const array: number[] = [];
          let tmp;

          for (let i = 0; i < 24; i++) {
            if (type === 'from' && i >= time) {
              tmp = i;
            } else if (type === 'to' && i <= time) {
              tmp = i;
            }
            array.push(tmp);
          }

          return array;
        }
      };

      return {
        form,
        isCollapse,
        options,
        locale,
        dayjs,
        splitNameField,
        disabledDate,
        onSelectMonth,
        onSelectDate,
        onDisabledHours,
      };
    },
  });
</script>

<style lang="scss">
  .form-bs-setting {
    .ant-calendar-picker,
    .ant-time-picker {
      width: 100%;
    }
  }
</style>
