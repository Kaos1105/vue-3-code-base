import Model from './Model';

export default class JobCategories extends Model {
  buildUrl(request: any) {
    const { params } = request;
    return ['settings/job-categories', ...params];
  }

  static async deleteCategory(id) {
    // @ts-ignore
    return new this().request({ method: 'DELETE', url: `settings/job-categories//${id}` });
  }

  static async updateCategory(id, data) {
    // @ts-ignore
    return new this().request({ method: 'PUT', url: `settings/job-categories//${id}`, data });
  }
}
