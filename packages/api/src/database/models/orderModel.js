import Database from '..';

import CartModel from './cartModel';

class OrderModel {
  constructor() {
    this.DB = Database;
    this.CartModel = new CartModel();
  }

  async add(details) {
    const { cartId, customerId, shippingId, taxId } = details;

    const cart = await this.CartModel.getProducts({ cartId });
    if (!cart.length) return null;

    const orderId = await this.DB.query('CALL shopping_cart_create_order(?, ?, ?, ?)', [
      cartId,
      customerId,
      shippingId,
      taxId,
    ]);
    return orderId[0][0].orderId;
  }

  async getInfo({ orderId }) {
    const info = await this.DB.query('CALL orders_get_order_info(?)', [orderId]);
    if (!info) return null;
    return info[0][0];
  }

  async getShortDetails({ orderId }) {
    const details = await this.DB.query('CALL orders_get_order_short_details(?)', [orderId]);
    if (!details[0].length) return null;
    return details[0][0];
  }

  async getCustomerOrders({ customerId }) {
    const orders = await this.DB.query('CALL orders_get_by_customer_id(?)', [customerId]);
    return orders[0];
  }
}

export default OrderModel;
