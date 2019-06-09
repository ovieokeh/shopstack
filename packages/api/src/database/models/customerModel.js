import runQuery from '..';

class CustomerModel {
  static async getByID(id) {
    const customerDB = await runQuery(`CALL customer_get_customer(?)`, [id]);
    return { ...customerDB[0] };
  }

  static async getByEmail(email) {
    const customer = await runQuery('SELECT * FROM customer WHERE email = ?', [email]);
    return customer;
  }

  static async create(details) {
    const { name, email, password } = details;
    const results = await runQuery(`CALL customer_add(?, ?, ?)`, [name, email, password]);
    const customerId = results[0]['LAST_INSERT_ID()'];

    const customer = await this.getByID(customerId);
    return customer;
  }

  static async updateAccount(details) {
    const { id, name, email, password, dayPhone, evePhone, mobPhone } = details;
    await runQuery('CALL customer_update_account(?, ?, ?, ?, ?, ?, ?)', [
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

  static async updateAddress(details) {
    const { id, address1, address2, city, region, postalCode, country, shippingRegionId } = details;
    await runQuery('CALL customer_update_address(?, ?, ?, ?, ?, ?, ?, ?)', [
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

  static async updateCreditCard({ id, creditCard }) {
    await runQuery('CALL customer_update_credit_card(?, ?)', [id, creditCard]);
    const updatedCustomer = await this.getByID(id);
    return updatedCustomer;
  }
}

export default CustomerModel;
