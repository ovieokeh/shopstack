import { CustomerModel } from '../database/models';
import { auth } from '../utilities';

/**
 * This class contains all customer related actions.
 * It is used by the customer controller.
 * @class
 */
class CustomerService {
  constructor() {
    this.CustomerModel = new CustomerModel();
  }

  /**
   * creates and stores a new customer
   * @param {Object} customerDetails
   * @returns {Object} an object containing the new customer and their token.
   */
  async create(customerDetails) {
    const customer = await this.CustomerModel.create(customerDetails);
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
   */
  async update(type, newDetails, customer) {
    const {
      name,
      email,
      password = customer.password,
      dayPhone = customer.day_phone,
      evePhone = customer.eve_phone,
      mobPhone = customer.mob_phone,
      creditCard = customer.credit_card,
      address1 = customer.address_1,
      address2 = customer.address_2,
      city = customer.city,
      region = customer.region,
      postalCode = customer.postal_code,
      country = customer.country,
      shippingRegionId = customer.shipping_region_id,
    } = newDetails;
    let updatedCustomer;

    switch (type) {
      case 'creditCard':
        updatedCustomer = await this.CustomerModel.updateCreditCard({
          id: customer.customer_id,
          creditCard,
        });
        break;

      case 'address':
        updatedCustomer = await this.CustomerModel.updateAddress({
          id: customer.customer_id,
          address1,
          address2,
          city,
          region,
          postalCode,
          country,
          shippingRegionId,
        });
        break;

      default:
        updatedCustomer = await this.CustomerModel.updateAccount({
          id: customer.customer_id,
          name,
          email,
          password,
          dayPhone,
          evePhone,
          mobPhone,
        });
    }

    delete updatedCustomer.password;
    return updatedCustomer;
  }
}

export default CustomerService;
