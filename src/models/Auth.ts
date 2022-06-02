import Model from './Model.js';
import axios from '@/plugins/axios';

interface LoginData {
  login_id: string;
  password: string;
}

export default class Auth extends Model {
  static baseUrl = 'auth';

  static async login(data: LoginData) {
    return axios.post(`${this.baseUrl}/login`, data).then((result) => result.data);
  }

  static async logout() {
    return axios.post(`${this.baseUrl}/logout`).then((result) => result.data);
  }
}
