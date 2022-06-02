<template>
  <div class="staff__registration">
    <div class="parent__title"
      ><span>{{ $t('setting.staff_registration') }}</span></div
    >
    <div class="card-common">
      <a-row class="table__row">
        <a-col :sm="24" :md="24" :lg="12" :xl="12">
          <!-- name -->
          <Field
            v-slot="{ value, handleChange, errorMessage }"
            v-model="form.name"
            :name="$t('setting.name')"
            as="div"
            class="form-group"
            rules="required|full_half_regex"
          >
            <div class="form-content">
              <label class="form-label required">{{ $t('setting.name') }}</label>
              <div class="form-input">
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
              </div>
            </div>
          </Field>
          <!-- staff code -->
          <Field
            v-slot="{ value, handleChange, errorMessage }"
            v-model="form.staff_code"
            :name="$t('setting.staff_code')"
            as="div"
            class="form-group"
            rules="numeric"
          >
            <div class="form-content">
              <label class="form-label">{{ $t('setting.staff_code') }}</label>
              <div class="form-input">
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
              </div>
            </div>
          </Field>
          <!-- job category -->
          <Field
            v-slot="{ value, handleChange, errorMessage }"
            v-model="form.job_category"
            :name="$t('setting.job_category')"
            as="div"
            class="form-group"
            rules="required"
          >
            <div class="form-content">
              <label class="form-label required">{{ $t('setting.job_category') }}</label>
              <div class="form-input">
                <a-form-item
                  :help="errorMessage"
                  :validate-status="errorMessage ? 'error' : undefined"
                >
                  <a-select
                    :value="value"
                    :placeholder="$t('common.please_enter')"
                    :options="categories"
                    @change="handleChange"
                  />
                </a-form-item>
              </div>
            </div>
          </Field>
          <!-- email -->
          <Field
            v-slot="{ value, handleChange, errorMessage }"
            v-model="form.email"
            :name="$t('setting.email')"
            as="div"
            class="form-group"
            rules="required|email"
          >
            <div class="form-content">
              <label class="form-label required">{{ $t('setting.email') }}</label>
              <div class="form-input">
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
              </div>
            </div>
          </Field>
          <!-- password -->
          <Field
            v-slot="{ value, handleChange, errorMessage }"
            v-model="form.password"
            :name="$t('setting.password')"
            as="div"
            class="form-group"
            rules="required|password|min:8|max:60"
          >
            <div class="form-content">
              <label class="form-label required">{{ $t('setting.password') }}</label>
              <div class="form-input">
                <a-form-item
                  :help="errorMessage"
                  :validate-status="errorMessage ? 'error' : undefined"
                >
                  <a-input
                    :value="value"
                    :placeholder="$t('common.please_enter')"
                    type="password"
                    @change="handleChange"
                  />
                </a-form-item>
              </div>
            </div>
          </Field>
          <!-- password confirm -->
          <Field
            v-slot="{ value, handleChange, errorMessage }"
            v-model="form.password_confirm"
            :name="$t('setting.password_confirm')"
            as="div"
            class="form-group"
            :rules="`required|confirmed:@${$t('setting.password')}`"
          >
            <div class="form-content">
              <label class="form-label required">{{ $t('setting.password_confirm') }}</label>
              <div class="form-input">
                <a-form-item
                  :help="errorMessage"
                  :validate-status="errorMessage ? 'error' : undefined"
                >
                  <a-input
                    :value="value"
                    :placeholder="$t('common.please_enter')"
                    type="password"
                    @change="handleChange"
                  />
                </a-form-item>
              </div>
            </div>
          </Field>
          <!-- phone -->
          <Field
            v-slot="{ value, handleChange, errorMessage }"
            v-model="form.phone"
            :name="$t('setting.phone')"
            as="div"
            class="form-group"
            rules="phone"
          >
            <div class="form-content">
              <label class="form-label">{{ $t('setting.phone') }}</label>
              <div class="form-input">
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
              </div>
            </div>
          </Field>
          <!-- date of hire -->
          <Field
            v-slot="{ value, handleChange, errorMessage }"
            v-model="form.hire_date"
            :name="$t('setting.hire_date')"
            as="div"
            class="form-group"
          >
            <div class="form-content">
              <label class="form-label">{{ $t('setting.hire_date') }}</label>
              <div class="form-input">
                <a-form-item
                  :help="errorMessage"
                  :validate-status="errorMessage ? 'error' : undefined"
                >
                  <a-date-picker
                    :value="value"
                    :inputReadOnly="true"
                    :showToday="false"
                    format="YYYY/MM/DD"
                    style="width: 100%"
                    @change="handleChange"
                  />
                </a-form-item>
              </div>
            </div>
          </Field>
        </a-col>
        <a-col :sm="24" :md="24" :lg="12" :xl="12">
          <!-- group name -->
          <div class="form-group">
            <div class="form-content">
              <label class="form-label">{{ $t('setting.group_setting') }}</label>
              <div class="form-input">
                <a-collapse
                  v-model:activeKey="activeKey"
                  :expand-icon-position="expandIconPosition"
                  style="margin-bottom: 24px"
                >
                  <a-collapse-panel key="1" :header="$t('setting.group_name')">
                    <table class="group__name">
                      <tbody>
                        <tr v-for="(item, index) in divisionEnum" :key="item.value">
                          <td>{{ item.label }}</td>
                          <td
                            ><a-switch
                              v-model:checked="checked[index]"
                              @change="onChangeGroupName($event, item.value)"
                          /></td>
                        </tr>
                      </tbody>
                    </table>
                  </a-collapse-panel>
                </a-collapse>
              </div>
            </div>
          </div>
          <!-- fixed break -->
          <div class="form-group">
            <div class="form-content">
              <label class="form-label">{{ $t('setting.fixed_break') }}</label>
              <div class="form-input">
                <a-form-item>
                  <a-checkbox
                    v-model:checked="form.fixed_break"
                    @change="form.fixed_break_time = !form.fixed_break ? '' : form.fixed_break_time"
                  />
                </a-form-item>
              </div>
            </div>
          </div>
          <!-- fixed break time -->
          <div class="form-group">
            <div class="form-content">
              <label class="form-label">{{ $t('setting.fixed_break_time') }}</label>
              <div class="form-input">
                <a-form-item>
                  <a-time-picker
                    v-model:value="form.fixed_break_time"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                    :disabled="!form.fixed_break"
                  />
                </a-form-item>
              </div>
            </div>
          </div>
          <!-- show -->
          <div class="form-group">
            <div class="form-content">
              <label class="form-label">{{ $t('setting.show') }}</label>
              <div class="form-input">
                <a-form-item>
                  <a-checkbox v-model:checked="form.show" />
                </a-form-item>
              </div>
            </div>
          </div>
          <!-- note -->
          <div class="form-group">
            <div class="form-content">
              <label class="form-label">{{ $t('setting.note') }}</label>
              <div class="form-input">
                <div class="text-aria">
                  <a-textarea
                    v-model:value="form.note"
                    :placeholder="$t('common.please_enter')"
                    :rows="3"
                  />
                </div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, watch, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import dayjs, { Dayjs } from 'dayjs';
  import { divisionEnum } from '@/enums/divisionEnum';
  import { forEach } from 'lodash-es';

  interface formState {
    name: string;
    staff_code: string;
    job_category: any;
    email: string;
    password: string;
    password_confirm?: string;
    phone: string;
    hire_date: string | null | Dayjs;
    group_name: number | string;
    fixed_break: boolean | number;
    fixed_break_time: string | null | Dayjs;
    note: string;
    show: boolean | number;
  }

  export default defineComponent({
    name: 'FormStaff',

    emits: ['form'],

    setup(_, { emit }) {
      const { t } = useI18n();
      const activeKey = ref(['1']);
      const expandIconPosition = ref('right');
      const checked = ref<boolean[]>([]);
      const form = reactive<formState>({
        name: '',
        staff_code: '',
        job_category: null,
        email: '',
        password: '',
        password_confirm: '',
        phone: '',
        hire_date: null,
        group_name: 0,
        fixed_break: false,
        fixed_break_time: null,
        note: '',
        show: false,
      });

      const categories = computed(() => {
        return [
          {
            value: 1,
            label: t('setting.full_time'),
          },
          {
            value: 2,
            label: t('setting.part_time'),
          },
          {
            value: 3,
            label: t('setting.retiree'),
          },
        ];
      });
      const workCategories = computed(() => {
        return [
          {
            value: 1,
            label: t('setting.normal'),
          },
          {
            value: 2,
            label: t('setting.work_in_day'),
          },
          {
            value: 3,
            label: t('setting.daily_init_price'),
          },
          {
            value: 4,
            label: t('setting.distance'),
          },
        ];
      });
      const daysWorked = computed(() => {
        return [
          {
            value: 1,
            label: t('setting.days_work_1'),
          },
          {
            value: 2,
            label: t('setting.days_work_2'),
          },
          {
            value: 3,
            label: t('setting.days_work_3'),
          },
          {
            value: 4,
            label: t('setting.days_work_4'),
          },
          {
            value: 5,
            label: t('setting.days_work_5'),
          },
          {
            value: 6,
            label: t('setting.days_work_6'),
          },
        ];
      });

      watch(form, (val) => {
        emit('form', val);
      });

      const onChangeGroupName = (_evt: boolean | string | number, value: number) => {
        if (form.group_name === value) {
          checked.value.splice(0);
          form.group_name = 0;
        } else {
          form.group_name = value;
          forEach(divisionEnum, (division, index) => {
            if (division.value === form.group_name) {
              checked.value.splice(0);
              checked.value[index] = true;
            }
          });
        }
      };

      return {
        form,
        checked,
        activeKey,
        divisionEnum,
        expandIconPosition,
        categories,
        workCategories,
        daysWorked,
        dayjs,
        onChangeGroupName,
      };
    },
  });
</script>
