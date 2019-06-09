import { CategoryService } from '../services';
import { respond } from '../utilities';

/**
 * Handles all category related endpoints
 * @class
 */
class CategoryController {
  /**
   * Handles the GET /categories endpoint
   * @param {Object} _
   * @param {Object} response
   * @static
   */
  static async getAll(_, response) {
    try {
      const categories = await CategoryService.getAll();
      respond(response, 'success', 200, 'categories retrieved successfully', categories);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /categories/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async getOne(request, response) {
    try {
      const categoryId = request.params.id;
      const category = await CategoryService.get(categoryId);

      if (!category) {
        respond(response, 'error', 404, 'category not found');
        return;
      }

      respond(response, 'success', 200, 'category retrieved successfully', category);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /categories/inDepartment/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async getDepartmentCategories(request, response) {
    try {
      const productId = request.params.id;
      const categories = await CategoryService.getDepartmentCategories(productId);

      if (!categories.length) {
        respond(response, 'error', 404, `no categories found for department with ID ${productId}`);
        return;
      }

      respond(response, 'success', 200, 'categories retrieved successfully', categories);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /categories/inProduct/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async getProductCategories(request, response) {
    try {
      const productId = request.params.id;
      const categories = await CategoryService.getProductCategories(productId);

      if (!categories.length) {
        respond(response, 'error', 404, `no categories found for product with ID ${productId}`);
        return;
      }

      respond(response, 'success', 200, 'categories retrieved successfully', categories);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }
}

export default CategoryController;
