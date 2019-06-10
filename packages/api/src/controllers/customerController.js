import { CustomerService } from '../services';
import { respond } from '../utilities';

/**
 * Handles all customer related endpoints
 * @class
 */
class CustomerController {
  constructor() {
    this.CustomerService = new CustomerService();
    this.register = this.register.bind(this);
    this.update = this.update.bind(this);
  }

  /**
   * Handles the POST /customers endpoint
   * @param {Object} request
   * @param {Object} response
   */
  async register(request, response) {
    try {
      const { name, email, password } = request.body;
      const customerDetails = { name, email, password };
      const result = await this.CustomerService.create(customerDetails);

      const resObject = {
        customer: result.customer,
        accessToken: result.token,
        expiresIn: '24h',
      };

      respond(response, 'success', 201, 'customer created successfully', resObject);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the POST /customers/login endpoint
   * @param {Object} request
   * @param {Object} response
   */
  static async login(request, response) {
    const {
      customer,
      body: { password },
    } = request;

    const result = await CustomerService.login(password, customer);

    if (!result) {
      respond(response, 'error', 401, 'invalid login credentials');
      return;
    }

    const resObject = {
      customer: result.customer,
      accessToken: result.token,
      expiresIn: '24h',
    };

    respond(response, 'success', 200, 'customer logged in successfully', resObject);
  }

  /**
   * Handles the GET /customer endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async getProfile(request, response) {
    const { customer } = request;
    delete customer.password;
    respond(response, 'success', 200, 'customer retrieved successfully', customer);
  }

  /**
   * Handles the following endpoints
   *
   * PUT /customer
   * PUT /customers/address,
   * PUT /customers/creditCard,
   * @param {Object} request
   * @param {Object} response
   */
  async update(request, response) {
    const { url } = request;
    const type = url.split('/')[2];

    try {
      const updatedCustomer = await this.CustomerService.update(
        type,
        request.body,
        request.customer,
      );

      respond(response, 'success', 200, 'customer updated successfully', updatedCustomer);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }
}

export default CustomerController;
