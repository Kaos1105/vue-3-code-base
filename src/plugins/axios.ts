import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { COOKIES_KEY } from '@/enums/cookieEnum';
import { useAuthStore } from '@/store/auth';
import { notification } from 'ant-design-vue';
import Cookies from 'js-cookie';
import i18n from '@/locale';

const { t } = i18n.global;

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_AXIOS_BASE_URL as string,
  timeout: 6000,
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json;charset=UTF-8',
  },
});

// Interceptors
instance.interceptors.request.use((config: AxiosRequestConfig | any): AxiosRequestConfig => {
  if (Cookies.get(COOKIES_KEY.TOKEN)) {
    config.headers['Authorization'] = `Bearer ${Cookies.get(COOKIES_KEY.TOKEN)}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response): AxiosResponse => response,
  async (error): Promise<AxiosError> => {
    // Do something with response error
    const { status, data } = error.response;
    const authStore = useAuthStore();
    const key = 'responseError';

    if (status) {
      if (status === 401) authStore.setLogout();

      notification.error({
        key,
        message: t('common.message_error'),
        description: data.message,
      });
    }

    return Promise.reject(error);
  },
);

export default instance;
