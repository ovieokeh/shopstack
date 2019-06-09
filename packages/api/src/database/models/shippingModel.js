import runQuery from '..';

class ShippingModel {
  static async getAll() {
    const regions = await runQuery('CALL customer_get_shipping_regions()');
    return regions[0];
  }

  static async getDetails(id) {
    const details = await runQuery('CALL orders_get_shipping_info(?)', [id]);
    return details[0];
  }
}

export default ShippingModel;
