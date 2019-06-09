import runQuery from '../database';
import { auth, Queries } from '../utilities';

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

    const customer = await Queries.findCustomerById(customerId);

    delete customer.password;
    const token = `Bearer ${auth.generateToken(customer)}`;

    return { customer, token };
  }

  /**
   * Logs in a customer and returns the customer's details and access token
   * @param {String} password
   * @param {Object} customer
   * @returns {Object} an object containing the customer's details and their token.
   * @static
   */
  static async login(password, customer) {
    const isPasswordMatch = auth.verifyPassword(password, customer.password);
    if (!isPasswordMatch) return;

    const token = `Bearer ${auth.generateToken(customer)}`;
    delete customer.password;

    return { customer, token };
  }

  /**
   * Updates a customer's record in the database and returns the new details
   * @param {String} field the record to be updated e.g creditCard, address, etc.
   * @param {Object} newDetails
   * @param {Object} customer
   * @returns {Object} an object containing the updated details
   * @static
   */
  static async update(type, newDetails, customer) {
    const { name, email } = newDetails;
    const password = newDetails.password || customer.password;
    const dayPhone = newDetails.dayPhone || customer.day_phone;
    const evePhone = newDetails.evePhone || customer.eve_phone;
    const mobPhone = newDetails.mobPhone || customer.mob_phone;
    const creditCard = newDetails.creditCard || customer.credit_card;
    const address1 = newDetails.address1 || customer.address_1;
    const address2 = newDetails.address2 || customer.address_2;
    const city = newDetails.city || customer.city;
    const region = newDetails.region || customer.region;
    const postalCode = newDetails.postalCode || customer.postal_code;
    const country = newDetails.country || customer.country;
    const shippingRegionId = newDetails.shippingRegionId || customer.shipping_region_id;

    switch (type) {
      case 'creditCard':
        await runQuery('CALL customer_update_credit_card(?,? )', [
          customer.customer_id,
          creditCard,
        ]);
        break;

      case 'address':
        await runQuery('CALL customer_update_address(?, ?, ?, ?, ?, ?, ?, ?)', [
          customer.customer_id,
          address1,
          address2,
          city,
          region,
          postalCode,
          country,
          shippingRegionId,
        ]);
        break;

      default:
        await runQuery('CALL customer_update_account(?, ?, ?, ?, ?, ?, ?)', [
          customer.customer_id,
          name,
          email,
          password,
          dayPhone,
          evePhone,
          mobPhone,
        ]);
    }

    const updatedCustomer = await Queries.findCustomerById(customer.customer_id);
    delete updatedCustomer.password;

    return updatedCustomer;
  }
}

export default CustomerService;
