import { validate, respond } from '../../utilities';

/**
 * This class contains all the validations for review related requests
 * @class
 */
class ReviewValidations {
  /**
   * Validates all review post requests
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   */
  static async add(request, response, next) {
    validate.review(request);

    const errors = request.validationErrors(true);

    if (errors) {
      respond(response, 'error', 422, 'validation error', errors);
      return;
    }

    next();
  }
}

export default ReviewValidations;
