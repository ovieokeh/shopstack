import { CategoryModel } from '../database/models';

/**
 * This class contains all category related actions.
 * It is used by the category controller.
 * @class
 */
class CategoryService {
  /**
   * retrieves all categories
   * @returns {Array} a list of all the categories
   * @static
   */
  static async getAll() {
    const categories = await CategoryModel.getAll();
    return categories;
  }

  /**
   * retrieves a single category by ID
   * @param {id} number
   * @returns {(Object|null)} the category or null if not found
   * @static
   */
  static async get(id) {
    const category = await CategoryModel.getByID(id);
    return category[0];
  }

  /**
   * retrieves the categories of a department
   * @param {id} number
   * @returns {(Array|null)} the list of categories or null if not found
   * @static
   */
  static async getDepartmentCategories(id) {
    const categories = await CategoryModel.getDepartmentCategories(id);
    return categories;
  }

  /**
   * retrieves the categories of a product
   * @param {id} number
   * @returns {Array} the list of categories
   * @static
   */
  static async getProductCategories(id) {
    const categories = await CategoryModel.getProductcategories(id);
    if (!categories) return [];
    return categories;
  }
}

export default CategoryService;
