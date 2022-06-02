import Model from './Model.js';

export default class Branches extends Model {
  buildUrl(request: any) {
    const { params } = request;
    return ['branches', ...params];
  }

  static async deleteBranch(id) {
    // @ts-ignore
    return new this().request({ method: 'DELETE', url: `branches/${id}` });
  }

  static async updateBranch(id, data) {
    // @ts-ignore
    return new this().request({ method: 'PUT', url: `branches/${id}`, data });
  }
}
