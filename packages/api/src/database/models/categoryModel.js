import Database from '..';

class CategoryModel {
  constructor() {
    this.DB = Database;
  }

  async getAll() {
    const categories = await this.DB.query('CALL catalog_get_categories()');
    return categories[0];
  }

  async getByID(id) {
    const category = await this.DB.query('CALL catalog_get_category_details(?)', [id]);
    return category[0];
  }

  async getProductcategories(id) {
    const categories = await this.DB.query('CALL catalog_get_categories_for_product(?)', [id]);
    return categories[0];
  }

  async getDepartmentCategories(id) {
    const categories = await this.DB.query('CALL catalog_get_department_categories(?)', [id]);
    return categories[0];
  }
}

export default CategoryModel;
