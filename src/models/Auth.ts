import Model from './Model.js';

interface LoginData {
  email: string;
  password: string;
}

export default class Auth extends Model {
  buildUrl(request: any) {
    const { params } = request;
    return ['auth', ...params];
  }

  static async login(data: LoginData) {
    // @ts-ignore
    return new this().request({ method: 'POST', url: 'auth/login', data });
  }

  static async profile(configs = {}) {
    // @ts-ignore
    return new this().request({ method: 'GET', url: 'auth/profile', ...configs });
  }

  static async logout() {
    // @ts-ignore
    return new this().request({ method: 'POST', url: 'auth/logout' });
  }
}
