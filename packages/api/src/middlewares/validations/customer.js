import runQuery from '../../database';
import { validate, auth, respond } from '../../utilities';

/**
 * This class contains all the validations for customer related requests
 * @class
 */
class CustomerValidations {
  /**
   * Validates all customer registration requests
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   */
  static async register(request, response, next) {
    validate.name(request);
    validate.email(request);
    validate.password(request);

    const errors = request.validationErrors(true);

    if (errors) {
      respond(response, 'error', 422, 'validation error', errors);
      return;
    }

    const { email, password } = request.body;

    const customer = await runQuery('SELECT name FROM customer WHERE email = ?', [email]);
    if (customer) {
      respond(response, 'error', 409, 'this email address is already in use');
      return;
    }

    request.body.password = auth.hashPassword(password);
    next();
  }

  /**
   * Validates all customer login requests
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   */
  static async login(request, response, next) {
    validate.email(request);
    validate.loginPassword(request);

    const errors = request.validationErrors(true);

    if (errors) {
      respond(response, 'error', 422, 'validation error', errors);
      return;
    }

    const { email } = request.body;
    const customer = await runQuery('SELECT * FROM customer WHERE email = ?', [email]);
    if (!customer) {
      respond(response, 'error', 401, 'invalid login credentials');
      return;
    }

    request.customer = { ...customer };
    next();
  }
}

export default CustomerValidations;
