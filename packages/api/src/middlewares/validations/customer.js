import { CustomerModel } from '../../database/models';
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

    const customer = await CustomerModel.getByEmail(email);
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
    const customer = await CustomerModel.getByEmail(email);
    if (!customer) {
      respond(response, 'error', 401, 'invalid login credentials');
      return;
    }

    request.customer = { ...customer };
    next();
  }

  /**
   * Validates all customer update requests
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   */
  static async update(request, response, next) {
    const url = request.url.split('/');
    const field = url[url.length - 1];
    let errors;

    switch (field) {
      case 'address':
        validate.address(request);
        errors = request.validationErrors(true);
        break;

      case 'creditCard':
        validate.creditCard(request);
        errors = request.validationErrors(true);
        break;

      default:
        validate.customerDetails(request);
        errors = request.validationErrors(true);
        break;
    }

    if (errors) {
      respond(response, 'error', 422, 'validation error', errors);
      return;
    }

    request.field = field;
    next();
  }
}

export default CustomerValidations;
