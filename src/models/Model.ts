import axios from '@/plugins/axios';
import { Pagination } from '@/utils';
import { AxiosResponse } from 'axios';

const responseBodyResult = <T>(response: AxiosResponse): ApiResponse<T> => response.data;

interface ApiResponse<T> {
  success: boolean;
  code: number;
  locale: string;
  message: string;
  data: T;
}

export interface ListData<T> {
  item: {
    collection: Array<T>;
    pagination: Pagination;
  };
}

export interface FilterType {
  [key: string]: string;
}

export interface SorterType {
  columnKey: string;
  order: 'ascend' | 'descend';
}

export interface QueryParams {
  filter?: FilterType[];
  sort?: string | null;
  include?: string;
  page?: number;
  perPage?: number;
}

class Model {
  static baseUrl = '';

  static async index<T>(query: QueryParams) {
    const { filter, ...rest } = query;
    const params = { ...filter, ...rest };
    return axios
      .get<ListData<T>>(`${this.baseUrl}`, { params })
      .then((response) => responseBodyResult<ListData<T>>(response).data);
  }

  static async show(id: string, query = {}) {
    return axios.get(`${this.baseUrl}/${id}`, { params: query }).then((result) => result.data);
  }

  static async update(id: string, data) {
    return axios.put(`${this.baseUrl}/${id}`, data).then((result) => result.data);
  }

  static async destroy(id: string) {
    return axios.delete(`${this.baseUrl}/${id}`).then((result) => result.data);
  }

  static async store(data: string) {
    return axios.post(`${this.baseUrl}`, data).then((result) => result.data);
  }
}

export default Model;
