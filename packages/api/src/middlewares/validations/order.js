import { validate, respond } from '../../utilities';

/**
 * This class contains all the validations for order related requests
 * @class
 */
class OrderValidations {
  /**
   * Validates all post order requests
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   */
  static async postOrder(request, response, next) {
    validate.bodyCartId(request);
    validate.shippingId(request);
    validate.taxId(request);

    const errors = request.validationErrors(true);

    if (errors) {
      respond(response, 'error', 422, 'validation error', errors);
      return;
    }

    next();
  }
}

export default OrderValidations;
