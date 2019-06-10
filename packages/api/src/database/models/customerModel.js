import Database from '..';

class CustomerModel {
  constructor() {
    this.DB = Database;
  }

  async getByID(id) {
    const customerDB = await this.DB.query(`CALL customer_get_customer(?)`, [id]);
    return { ...customerDB[0][0] };
  }

  async getByEmail(email) {
    const customer = await this.DB.query('SELECT * FROM customer WHERE email = ?', [email]);
    return customer[0];
  }

  async create(details) {
    const { name, email, password } = details;
    const results = await this.DB.query(`CALL customer_add(?, ?, ?)`, [name, email, password]);
    const customerId = results[0][0]['LAST_INSERT_ID()'];

    const customer = await this.getByID(customerId);
    return customer;
  }

  async updateAccount(details) {
    const { id, name, email, password, dayPhone, evePhone, mobPhone } = details;
    await this.DB.query('CALL customer_update_account(?, ?, ?, ?, ?, ?, ?)', [
      id,
      name,
      email,
      password,
      dayPhone,
      evePhone,
      mobPhone,
    ]);

    const updatedCustomer = await this.getByID(id);
    return updatedCustomer;
  }

  async updateAddress(details) {
    const { id, address1, address2, city, region, postalCode, country, shippingRegionId } = details;
    await this.DB.query('CALL customer_update_address(?, ?, ?, ?, ?, ?, ?, ?)', [
      id,
      address1,
      address2,
      city,
      region,
      postalCode,
      country,
      shippingRegionId,
    ]);

    const updatedCustomer = await this.getByID(id);
    return updatedCustomer;
  }

  async updateCreditCard({ id, creditCard }) {
    await this.DB.query('CALL customer_update_credit_card(?, ?)', [id, creditCard]);
    const updatedCustomer = await this.getByID(id);
    return updatedCustomer;
  }
}

export default CustomerModel;
