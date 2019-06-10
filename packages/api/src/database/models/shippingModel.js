import Database from '..';

class ShippingModel {
  constructor() {
    this.DB = Database;
  }

  async getAll() {
    const regions = await this.DB.query('CALL customer_get_shipping_regions()');
    return regions[0];
  }

  async getDetails(id) {
    const details = await this.DB.query('CALL orders_get_shipping_info(?)', [id]);
    return details[0];
  }
}

export default ShippingModel;
