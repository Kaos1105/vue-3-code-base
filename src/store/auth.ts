import { defineStore } from 'pinia';
import { COOKIES_KEY } from '@/enums/cookieEnum';
import Cookies from 'js-cookie';

interface Profile {
  id?: string;
  email: string;
  name: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthState {
  profile: Profile;
  token: string | unknown;
}

const initProfile = {
  id: '',
  email: '',
  name: '',
  phone: '',
};

export const useAuthStore = defineStore({
  id: 'auth',

  state: (): AuthState => ({
    profile: { ...initProfile },
    token: Cookies.get(COOKIES_KEY.TOKEN),
  }),

  getters: {
    authProfile: (state) => state.profile,
    hasToken: (state) => state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
      Cookies.set(COOKIES_KEY.TOKEN, token, { expires: 7 });
    },

    setProfile(profile: Profile) {
      this.profile = { ...profile };
    },

    setLogout() {
      this.token = '';
      this.profile = { ...initProfile };
      Cookies.remove(COOKIES_KEY.TOKEN, { expires: 7 });
    },
  },
});
