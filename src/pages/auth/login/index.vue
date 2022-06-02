<template>
  <div class="login">
    <drawer-language class="login__lang" />

    <div class="container-tight py-6">
      <form class="card" @submit="onSubmit">
        <div class="card-body">
          <div class="text-center login__logo">
            <img alt="logo" :src="logo" />
          </div>
          <!-- email -->
          <div class="form-group">
            <Field
              v-slot="{ value, handleChange, errorMessage }"
              v-model="form.email"
              :name="$t('login.email_label')"
              rules="required|email"
            >
              <div class="form-content">
                <label class="form-label required u-mb-4">
                  {{ $t('login.email_label') }}
                </label>
                <div class="form-input">
                  <a-form-item
                    :help="errorMessage"
                    :validate-status="errorMessage ? 'error' : undefined"
                  >
                    <a-input
                      :value="value"
                      :placeholder="$t('login.username_placeholder')"
                      @change="handleChange"
                    />
                  </a-form-item>
                </div>
              </div>
            </Field>
          </div>
          <!-- password -->
          <div class="form-group">
            <Field
              v-slot="{ value, handleChange, errorMessage }"
              v-model.trim="form.password"
              :name="$t('login.password_label')"
              rules="required|password|min:8|max:60"
            >
              <div class="form-content">
                <label class="form-label required u-mb-4">
                  {{ $t('login.password_label') }}
                </label>
                <div class="form-input">
                  <a-form-item
                    :help="errorMessage"
                    :validate-status="errorMessage ? 'error' : undefined"
                  >
                    <a-input-password
                      :value="value"
                      :placeholder="$t('login.password_placeholder')"
                      @change="handleChange"
                    />
                  </a-form-item>
                </div>
              </div>
            </Field>
          </div>
          <!-- Save password -->
          <div class="form-group">
            <div class="form-content">
              <a-checkbox v-model:checked="remember">{{ $t('login.save_password') }}</a-checkbox>
            </div>
          </div>
          <!-- Action Section Submit -->
          <div class="form-footer text-center">
            <a-button
              key="submit"
              type="primary"
              html-type="submit"
              :loading="loading"
              class="h-35"
              style="width: 150px"
            >
              {{ $t('login.login_submit') }}
            </a-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useForm } from 'vee-validate';
  import { isEmpty } from 'lodash-es';
  import { dataDecryption, dataEncryption } from '@/utils';
  import { secretKeyEnum } from '@/enums/secretKeyEnum';
  import { DrawerLanguage } from '@/components/Shared';
  import { useAuthStore } from '@/store/auth';
  import Auth from '@/models/Auth';
  import logo from '@/assets/logo.png';
  import { COOKIES_KEY } from '@/enums/cookieEnum';
  import { useRouter } from 'vue-router';
  import Cookies from 'js-cookie';

  interface Params {
    email: string;
    password: string;
  }

  export default defineComponent({
    name: 'Index',

    components: {
      DrawerLanguage,
    },

    setup() {
      const { t } = useI18n();
      const router = useRouter();
      const authStore = useAuthStore();
      const { handleSubmit, setErrors } = useForm();

      const form = ref<Params>({ email: '', password: '' });
      const loading = ref<boolean>(false);
      const remember = ref<boolean>(false);

      onMounted(() => {
        const dataDecrypted = dataDecryption(
          Cookies.get(COOKIES_KEY.REMEMBER_ME),
          secretKeyEnum.timeXRememberUser,
        );

        if (!isEmpty(dataDecrypted)) {
          remember.value = true;
          form.value = { ...dataDecrypted };
        }
      });

      const onSubmit = handleSubmit(async () => {
        loading.value = true;
        try {
          const { data } = await Auth.login(form.value);
          const { token, profile } = data;

          loading.value = false;
          authStore.setToken(token);
          authStore.setProfile(profile.data);

          if (remember.value) {
            Cookies.set(
              COOKIES_KEY.REMEMBER_ME,
              dataEncryption(form.value, secretKeyEnum.timeXRememberUser),
            );
          } else {
            Cookies.remove(COOKIES_KEY.REMEMBER_ME);
          }

          await router.push({ name: 'dashboard' });
        } catch (error: any) {
          loading.value = false;

          const arr = ['login.email_label', 'login.password_label'];
          const obj = {};

          for (let i = 0; i < arr.length; i++) {
            obj[`${t(arr[i])}`] = t('error.email_pw_incorrect');
          }

          setErrors(obj);
          authStore.setLogout();
          Cookies.remove(COOKIES_KEY.REMEMBER_ME);
        }
      });

      return {
        logo,
        remember,
        form,
        loading,
        onSubmit,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    align-items: center;
    min-height: 100vh;
    background-image: url('@/assets/background.svg');
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
    width: 100%;

    &__lang {
      position: absolute;
      right: 15px;
      top: 15px;
    }

    .container-tight {
      max-width: 524px;
    }

    .card {
      border-radius: 10px;
      box-shadow: 0 3px 6px rgb(0 0 0 / 8%), 0 3px 6px rgb(0 0 0 / 8%);

      &-body {
        padding: 30px 0;
        max-width: 375px;
        margin: 0 auto;
        width: 100%;

        .form-group {
          max-width: 375px;

          .form-content {
            .form-label {
              display: block;
              color: rgba(0, 0, 0, 0.85);
              &.required:after {
                content: '*';
                margin-left: 0.25rem;
                color: #cd201f;
              }
            }
          }
        }

        .form-input {
          .ant-input-password {
            height: 39px;
          }

          input {
            font-size: 13px;
            padding: 13px 15px;
            height: 39px;
          }
        }

        .form-footer {
          margin-top: 2rem;
        }
      }
    }

    &__logo {
      margin-bottom: 30px;

      img {
        min-width: 200px;
      }
    }
  }
</style>
