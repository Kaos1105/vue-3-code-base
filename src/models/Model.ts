import axios from '@/plugins/axios';

class Model {
  static baseUrl = '';
  static async index(query) {
    return axios.get(`${this.baseUrl}`, { params: query }).then((result) => result.data);
  }

  static async show(id, query = {}) {
    return axios.get(`${this.baseUrl}/${id}`, { params: query }).then((result) => result.data);
  }

  static async update(id, data) {
    return axios.put(`${this.baseUrl}/${id}`, data).then((result) => result.data);
  }

  static async destroy(id) {
    return axios.delete(`${this.baseUrl}/${id}`).then((result) => result.data);
  }

  static async store(data) {
    return axios.post(`${this.baseUrl}`, data).then((result) => result.data);
  }
}

export default Model;
