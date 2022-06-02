<template>
  <div class="staff__registration">
    <div class="parent__title">
      <span>{{ $t('setting.fixed_shift_setting') }}</span>
    </div>
    <div class="card-common">
      <a-row class="table__row">
        <a-col :sm="24" :md="24" :lg="12" :xl="12">
          <!-- monday -->
          <div class="form-group">
            <div class="form-content">
              <label class="form-label">{{ $t('setting.mon') }}</label>
              <div class="form-input">
                <a-form-item>
                  <a-time-picker
                    v-model:value="form.mon[0]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-form-item>
                  <a-time-picker
                    v-model:value="form.mon[1]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-tooltip color="#fff" :title="$t('common.copy')">
                  <a-button type="link" class="btn__copy" @click="copyClipBoard">
                    <template #icon>
                      <copy-outlined />
                    </template>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
          </div>
          <!-- wed -->
          <div class="form-group">
            <div class="form-content">
              <label class="form-label">{{ $t('setting.wed') }}</label>
              <div class="form-input">
                <a-form-item>
                  <a-time-picker
                    v-model:value="form.wed[0]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-form-item>
                  <a-time-picker
                    v-model:value="form.wed[1]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-tooltip color="#fff" :title="$t('common.copy')">
                  <a-button type="link" class="btn__copy" @click="copyClipBoard">
                    <template #icon>
                      <copy-outlined />
                    </template>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
          </div>
          <!-- fri -->
          <div class="form-group">
            <div class="form-content">
              <label class="form-label">{{ $t('setting.fri') }}</label>
              <div class="form-input">
                <a-form-item>
                  <a-time-picker
                    v-model:value="form.fri[0]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-form-item>
                  <a-time-picker
                    v-model:value="form.fri[1]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-tooltip color="#fff" :title="$t('common.copy')">
                  <a-button type="link" class="btn__copy" @click="copyClipBoard">
                    <template #icon>
                      <copy-outlined />
                    </template>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
          </div>
          <!-- sun -->
          <div class="form-group">
            <div class="form-content">
              <label class="form-label">{{ $t('setting.sun') }}</label>
              <div class="form-input">
                <a-form-item>
                  <a-time-picker
                    v-model:value="form.sun[0]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-form-item>
                  <a-time-picker
                    v-model:value="form.sun[1]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-tooltip color="#fff" :title="$t('common.copy')">
                  <a-button type="link" class="btn__copy" @click="copyClipBoard">
                    <template #icon>
                      <copy-outlined />
                    </template>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
          </div>
        </a-col>

        <a-col :sm="24" :md="24" :lg="12" :xl="12">
          <!-- tuesday -->
          <div class="form-group">
            <div class="form-content">
              <label class="form-label">{{ $t('setting.tue') }}</label>
              <div class="form-input">
                <a-form-item>
                  <a-time-picker
                    v-model:value="form.tue[0]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-form-item>
                  <a-time-picker
                    v-model:value="form.tue[1]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-tooltip color="#fff" :title="$t('common.copy')">
                  <a-button type="link" class="btn__copy" @click="copyClipBoard">
                    <template #icon>
                      <copy-outlined />
                    </template>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
          </div>
          <!-- thu -->
          <div class="form-group">
            <div class="form-content">
              <label class="form-label">{{ $t('setting.thu') }}</label>
              <div class="form-input">
                <a-form-item>
                  <a-time-picker
                    v-model:value="form.thu[0]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-form-item>
                  <a-time-picker
                    v-model:value="form.thu[1]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-tooltip color="#fff" :title="$t('common.copy')">
                  <a-button type="link" class="btn__copy" @click="copyClipBoard">
                    <template #icon>
                      <copy-outlined />
                    </template>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
          </div>
          <!-- sat -->
          <div class="form-group">
            <div class="form-content">
              <label class="form-label">{{ $t('setting.sat') }}</label>
              <div class="form-input">
                <a-form-item>
                  <a-time-picker
                    v-model:value="form.sat[0]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-form-item>
                  <a-time-picker
                    v-model:value="form.sat[1]"
                    :minute-step="30"
                    format="HH:mm"
                    value-format="HH:mm"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-tooltip color="#fff" :title="$t('common.copy')">
                  <a-button type="link" class="btn__copy" @click="copyClipBoard">
                    <template #icon>
                      <copy-outlined />
                    </template>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, watch } from 'vue';
  import dayjs from 'dayjs';
  import { useI18n } from 'vue-i18n';
  import { CopyOutlined } from '@ant-design/icons-vue';

  interface FormState {
    mon?: string[];
    tue?: string[];
    wed?: string[];
    thu?: string[];
    fri?: string[];
    sat?: string[];
    sun?: string[];
  }

  interface OptionState {
    value: string | number;
    label: string;
  }

  const initState: FormState = {
    mon: ['', ''],
    tue: ['', ''],
    wed: ['', ''],
    thu: ['', ''],
    fri: ['', ''],
    sat: ['', ''],
    sun: ['', ''],
  };

  export default defineComponent({
    name: 'FormFixedShift',

    components: {
      CopyOutlined,
    },

    emits: ['form'],

    setup(_, { emit }) {
      const { t } = useI18n();
      let form = reactive(initState);

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
        emit('form', val);
      });

      const copyClipBoard = () => {
        console.log('copy');
      };

      return {
        form,
        options,
        dayjs,
        copyClipBoard,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .form-group {
    .form-content {
      .form-label {
        display: block;
      }
      .form-input {
        display: inline-flex;
        width: 100%;
        .ant-form-item {
          width: 100%;
          &:first-child {
            padding-right: 15px;
          }
        }
      }
    }
  }

  .btn__copy {
    margin-left: 5px;
  }
</style>
