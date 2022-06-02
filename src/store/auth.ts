import { defineStore } from 'pinia';
import { COOKIES_KEY } from '@/enums/cookieEnum';
import Cookies from 'js-cookie';

interface Staff {
  id?: string;
  email: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthState {
  staff: Staff;
  token: string | unknown;
}

const initStaff = {
  id: '',
  email: '',
  name: '',
  phone: '',
};

export const useAuthStore = defineStore({
  id: 'auth',

  state: (): AuthState => ({
    staff: { ...initStaff },
    token: Cookies.get(COOKIES_KEY.TOKEN),
  }),

  getters: {
    authProfile: (state) => state.staff,
    hasToken: (state) => state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
      Cookies.set(COOKIES_KEY.TOKEN, token, { expires: 7 });
    },

    setStaff(staff: Staff) {
      this.staff = { ...staff };
    },

    setLogout() {
      this.token = '';
      this.staff = { ...initStaff };
      Cookies.remove(COOKIES_KEY.TOKEN, { expires: 7 });
    },
  },
});
