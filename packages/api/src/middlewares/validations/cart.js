import { validate, respond } from '../../utilities';

/**
 * This class contains all the validations for shopping cart related requests
 * @class
 */
class ShoppingCartValidations {
  /**
   * Validates all add to cart requests
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   */
  static async addToCart(request, response, next) {
    validate.addToCart(request);

    const errors = request.validationErrors(true);

    if (errors) {
      respond(response, 'error', 422, 'validation error', errors);
      return;
    }

    next();
  }

  /**
   * Validates all get products in cart requests
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   */
  static async getProducts(request, response, next) {
    validate.cartId(request);

    const errors = request.validationErrors(true);
    if (errors) {
      respond(response, 'error', 422, 'validation error', errors);
      return;
    }

    next();
  }

  /**
   * Validates all update item quantity in cart requests
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   */
  static async updateItemQuantity(request, response, next) {
    validate.itemUpdate(request);

    const errors = request.validationErrors(true);
    if (errors) {
      respond(response, 'error', 422, 'validation error', errors);
      return;
    }

    next();
  }
}

export default ShoppingCartValidations;
