import { useAuthStore } from '@/store/auth';
import { every} from 'lodash-es';

export const AuthGuard = async (_to, _from, next) => {
  const authStore = useAuthStore();
  const isProfile = every(authStore.authProfile, (item: any) => item);

  if (!authStore.token) {
    next({ name: 'login' });
  }

  if (isProfile) {
    next();
  }

  try {
    // if (!isProfile && authStore.token) {
    //   const { data } = await Auth.profile();
    //   if (isEmpty(data)) {
    //     next({ name: 'login' });
    //   } else {
    //     authStore.setProfile(data);
    //     next();
    //   }
    // }
    next();
  } catch (e) {
    authStore.setLogout();
    next({ name: 'login' });
  }
};
