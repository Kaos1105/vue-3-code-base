import Model from './Model.js';

export interface CompanyItem {
  id: number;
  code: string;
  name: string;
  classification: number;
  address: string;
  use_flg: number;
  tel_1: string;
}

export default class Company extends Model {
  static baseUrl = 'companies';
}
