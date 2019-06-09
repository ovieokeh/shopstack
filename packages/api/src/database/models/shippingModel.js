import runQuery from '..';

class ShippingModel {
  static async getAll() {
    const regions = await runQuery('CALL customer_get_shipping_regions()');
    return regions;
  }

  static async getDetails(id) {
    const details = await runQuery('CALL orders_get_shipping_info(?)', [id]);
    return details;
  }
}

export default ShippingModel;
