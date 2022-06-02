<template>
  <table class="table-form">
    <thead>
      <tr>
        <th>{{ $t('user.address') }}</th>
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
                      <!-- post code -->
                      <Field
                        v-slot="{ value, handleChange, errorMessage }"
                        v-model="form.post_code"
                        :name="$t('user.post_code')"
                        as="tr"
                        rules="post_code"
                      >
                        <td>{{ $t('user.post_code') }}</td>
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
                      <!-- city -->
                      <Field
                        v-slot="{ value, handleChange, errorMessage }"
                        v-model="form.city"
                        :name="$t('user.city')"
                        as="tr"
                        rules="required"
                      >
                        <td class="required">{{ $t('user.city') }}</td>
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
                      <!-- building name -->
                      <Field
                        v-slot="{ value, handleChange, errorMessage }"
                        v-model="form.building_name"
                        :name="$t('user.building_name')"
                        as="tr"
                        rules="required"
                      >
                        <td class="required">{{ $t('user.building_name') }}</td>
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
                      <!-- province -->
                      <Field
                        v-slot="{ value, handleChange, errorMessage }"
                        v-model="form.province"
                        :name="$t('user.province')"
                        as="tr"
                        rules="required"
                      >
                        <td class="required">{{ $t('user.province') }}</td>
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
                      <!-- another address -->
                      <Field
                        v-slot="{ value, handleChange, errorMessage }"
                        v-model="form.another_address"
                        :name="$t('user.another_address')"
                        as="tr"
                        rules="required"
                      >
                        <td class="required">{{ $t('user.another_address') }}</td>
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
  import { defineComponent, reactive, ref, watch } from 'vue';
  import { DownOutlined } from '@ant-design/icons-vue';

  interface FormState {
    post_code: number | string;
    city: string;
    building_name: string;
    province: string;
    another_address: string;
  }

  const initState = {
    post_code: '',
    city: '',
    building_name: '',
    province: '',
    another_address: '',
  };

  export default defineComponent({
    name: 'FormAddressSetting',

    components: {
      DownOutlined,
    },

    emits: ['form-setting'],

    setup(_, { emit }) {
      const isCollapse = ref(true);
      let form = reactive<FormState>(initState);

      watch(form, (val) => {
        emit('form-setting', val);
      });

      return {
        form,
        isCollapse,
      };
    },
  });
</script>

<style lang="scss"></style>
