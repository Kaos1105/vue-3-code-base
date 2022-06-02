import Model from './Model.js';

export default class Groups extends Model {
  buildUrl(request: any) {
    const { params } = request;
    return ['groups', ...params];
  }

  static async deleteGroup(id) {
    // @ts-ignore
    return new this().request({ method: 'DELETE', url: `groups/${id}` });
  }

  static async updateGroup(id, data) {
    // @ts-ignore
    return new this().request({ method: 'PUT', url: `groups/${id}`, data });
  }
}
