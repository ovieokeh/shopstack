import { ProductService } from '../services';
import { respond } from '../utilities';

/**
 * Handles all product related endpoints
 * @class
 */
class ProductController {
  /**
   * Handles the GET /products endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async getAll(request, response) {
    try {
      const { page, limit, descriptionLength } = request.query;

      const productResults = await ProductService.getAll({
        page: +page || 1,
        limit: +limit || 20,
        descriptionLength: +descriptionLength || 200,
      });

      const res = {
        count: productResults.products.length,
        totalCount: productResults.productCount,
        page: +page || 1,
        products: productResults.products,
      };

      respond(response, 'success', 200, 'products retrieved successfully', res);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /products/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async getOne(request, response) {
    try {
      const productId = request.params.id;
      const product = await ProductService.get(productId);

      if (!product) {
        respond(response, 'error', 404, 'product not found');
        return;
      }

      respond(response, 'success', 200, 'product retrieved successfully', product);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /products/search endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async search(request, response) {
    try {
      const { queryString, allWords, page, limit, descriptionLength } = request.query;
      const parsedQuery = queryString.replace(/ /g, '%');

      const searchResults = await ProductService.search({
        queryString: parsedQuery.toLowerCase(),
        allWords: allWords === 'true' ? 1 : false,
        page: +page || 1,
        limit: +limit || 20,
        descriptionLength: +descriptionLength || 200,
      });

      if (!searchResults.resultCount) {
        respond(response, 'error', 404, 'no product matches those criteria');
        return;
      }

      const res = {
        totalCount: searchResults.resultCount,
        count: searchResults.results.length,
        page: +page || 1,
        results: searchResults.results,
      };

      respond(response, 'success', 200, 'results retrieved successfully', res);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /products/inCategory/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async getFromCategory(request, response) {
    try {
      const categoryId = request.params.id;
      const { page, limit, descriptionLength } = request.query;

      const productResults = await ProductService.getFromCategory({
        categoryId,
        page: +page || 1,
        limit: +limit || 20,
        descriptionLength: +descriptionLength || 200,
      });

      if (!productResults.productCount) {
        respond(response, 'error', 404, `no product found for category with ID ${categoryId}`);
        return;
      }

      const res = {
        totalCount: productResults.productCount,
        count: productResults.products.length,
        page: +page || 1,
        products: productResults.products,
      };

      respond(response, 'success', 200, 'products retrieved successfully', res);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /products/inDepartment/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async getFromDepartment(request, response) {
    try {
      const departmentId = request.params.id;
      const { page, limit, descriptionLength } = request.query;

      const productResults = await ProductService.getFromDepartment({
        departmentId,
        page: +page || 1,
        limit: +limit || 20,
        descriptionLength: +descriptionLength || 200,
      });

      if (!productResults.productCount) {
        respond(response, 'error', 404, `no product found for department with ID ${departmentId}`);
        return;
      }

      const res = {
        totalCount: productResults.productCount,
        count: productResults.products.length,
        page: +page || 1,
        products: productResults.products,
      };

      respond(response, 'success', 200, 'products retrieved successfully', res);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /products/:id/locations endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async getLocations(request, response) {
    try {
      const productId = request.params.id;
      const locations = await ProductService.getLocations(productId);

      if (!locations) {
        respond(
          response,
          'error',
          404,
          `location details not found for product with ID ${productId}`,
        );
        return;
      }

      respond(response, 'success', 200, 'product locations retrieved successfully', locations);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the POST /products/:id/reviews endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async postReview(request, response) {
    try {
      const { customer } = request;
      const productId = request.params.id;
      const { review, rating } = request.body;

      const postedReview = await ProductService.addReview(customer.customer_id, productId, {
        review,
        rating,
      });

      if (!postedReview) {
        respond(response, 'error', 404, 'product not found');
        return;
      }

      respond(response, 'success', 201, 'review posted successfully', postedReview);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /products/:id/reviews endpoint
   * @param {Object} request
   * @param {Object} response
   */
  static async getReviews(request, response) {
    try {
      const productId = request.params.id;

      const reviews = await ProductService.getReviews(productId);

      if (!reviews) {
        respond(response, 'error', 404, 'product not found');
        return;
      }

      if (!reviews.length) {
        respond(response, 'error', 404, 'no reviews found');
        return;
      }

      respond(response, 'success', 200, 'reviews retrieved successfully', reviews);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }
}

export default ProductController;
