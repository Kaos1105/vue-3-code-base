import { Model as BaseModel } from 'javel';
import axios from '@/plugins/axios';

export default class Model extends BaseModel {
  baseUrl() {
    return `${import.meta.env.VITE_APP_AXIOS_BASE_URL}`;
  }

  makeRequest({ method, url, data, query }) {
    return axios({ method, url, data, params: query });
  }
}
