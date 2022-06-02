import { useAuthStore } from '@/store/auth';
import { every } from 'lodash-es';
import Cookies from 'js-cookie';
import { COOKIES_KEY } from '@/enums/cookieEnum';

export const LoginGuard = (_to, _from, next) => {
  const authStore = useAuthStore();
  const isProfile = every(authStore.authProfile, (item: any) => item);
  if (isProfile || Cookies.get(COOKIES_KEY.TOKEN)) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
};
