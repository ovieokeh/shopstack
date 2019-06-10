import { CategoryModel } from '../database/models';

/**
 * This class contains all category related actions.
 * It is used by the category controller.
 * @class
 */
class CategoryService {
  constructor() {
    this.CategoryModel = new CategoryModel();
  }

  /**
   * retrieves all categories
   * @returns {Array} a list of all the categories
   */
  async getAll() {
    const categories = await this.CategoryModel.getAll();
    return categories;
  }

  /**
   * retrieves a single category by ID
   * @param {id} number
   * @returns {(Object|null)} the category or null if not found
   */
  async get(id) {
    const category = await this.CategoryModel.getByID(id);
    return category[0];
  }

  /**
   * retrieves the categories of a department
   * @param {id} number
   * @returns {(Array|null)} the list of categories or null if not found
   */
  async getDepartmentCategories(id) {
    const categories = await this.CategoryModel.getDepartmentCategories(id);
    return categories;
  }

  /**
   * retrieves the categories of a product
   * @param {id} number
   * @returns {Array} the list of categories
   */
  async getProductCategories(id) {
    const categories = await this.CategoryModel.getProductcategories(id);
    if (!categories) return [];
    return categories;
  }
}

export default CategoryService;
