import runQuery from '../database';
import { auth } from '../utilities';

/**
 * This class contains all customer related actions.
 * It is used by the customer controller.
 * @class
 */
class CustomerService {
  /**
   * creates and stores a new customer
   * @param {Object} customerDetails
   * @returns {Object} an object containing the new customer and their token.
   * @static
   */
  static async create(customerDetails) {
    const { name, email, password } = customerDetails;

    const results = await runQuery(`CALL customer_add(?, ?, ?)`, [name, email, password]);
    const customerId = results[0]['LAST_INSERT_ID()'];

    const customerDB = await runQuery(`CALL customer_get_customer(?)`, [customerId]);
    const customer = { ...customerDB[0] };

    delete customer.password;
    const token = `Bearer ${auth.generateToken(customer)}`;

    return { customer, token };
  }
}

export default CustomerService;
