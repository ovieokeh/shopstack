import runQuery from '../database';

class Queries {
  static async findCustomerById(id) {
    const customerDB = await runQuery(`CALL customer_get_customer(?)`, [id]);
    return { ...customerDB[0] };
  }
}

export default Queries;
