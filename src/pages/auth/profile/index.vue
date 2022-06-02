<template>
  <section class="user-profile">
    <div class="card-common">
      <form @submit.prevent="onSubmit">
        <a-row :gutter="[16, 16]">
          <a-col :span="12">
            <!-- name -->
            <Field
              v-slot="{ value, handleChange, errorMessage }"
              v-model="form.name"
              :name="$t('user.name')"
              as="div"
              class="form-group"
              rules="required|full_half_regex"
            >
              <div class="form-content">
                <label class="form-label required">{{ $t('user.name') }}</label>
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
            <!-- phone number -->
            <Field
              v-slot="{ value, handleChange, errorMessage }"
              v-model="form.phone"
              :name="$t('user.phone')"
              as="div"
              class="form-group"
              rules="required|phone"
            >
              <div class="form-content">
                <label class="form-label required">{{ $t('user.phone') }}</label>
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
            <!-- email address -->
            <Field
              v-slot="{ value, handleChange, errorMessage }"
              v-model="form.email"
              :name="$t('user.email')"
              as="div"
              class="form-group"
              rules="required|email"
            >
              <div class="form-content">
                <label class="form-label required">{{ $t('user.email') }}</label>
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
          </a-col>
          <a-col :span="12">
            <!-- password -->
            <Field
              v-slot="{ value, handleChange, errorMessage }"
              v-model.trim="form.password"
              :name="$t('user.password')"
              as="div"
              class="form-group"
              rules="required|password|min:8|max:60"
            >
              <div class="form-content">
                <label class="form-label required">{{ $t('user.password') }}</label>
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
              v-model.trim="form.password_confirm"
              :name="$t('user.password_confirm')"
              as="div"
              class="form-group"
              :rules="`required|confirmed:@${$t('user.password')}`"
            >
              <div class="form-content">
                <label class="form-label required">{{ $t('user.password_confirm') }}</label>
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
          </a-col>
        </a-row>

        <!-- Action Section Submit & Cancel -->
        <div class="card-footer text-right">
          <a-button key="submit" type="primary" html-type="submit" style="width: 105px">
            {{ $t('common.update') }}
          </a-button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useForm } from 'vee-validate';
  import { useAuthStore } from '@/store/auth';

  interface Form {
    name: string;
    phone: string | number;
    email: string;
    password?: string;
    password_confirm?: string;
  }

  export default defineComponent({
    name: 'Profile',

    setup() {
      const authStore = useAuthStore();
      const { handleSubmit } = useForm();
      let form = ref<Form>({
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirm: '',
      });

      onMounted(() => {
        const { id, created_at, updated_at, ...profile } = authStore.profile;
        profile.phone = profile?.phone.replace('+', '');
        form.value = { ...form.value, ...profile };
      });

      const onSubmit = handleSubmit(() => {
        let data = { ...form.value };
        delete data.password_confirm;
        console.log(data);
      });

      return {
        form,
        onSubmit,
      };
    },
  });
</script>

<style lang="scss" scoped></style>
