import runQuery from '..';
import CartModel from './cartModel';

class OrderModel {
  static async add(details) {
    const { cartId, customerId, shippingId, taxId } = details;

    const cart = await CartModel.getProducts({ cartId });
    if (!cart.length) return null;

    const orderId = await runQuery('CALL shopping_cart_create_order(?, ?, ?, ?)', [
      cartId,
      customerId,
      shippingId,
      taxId,
    ]);
    return orderId[0][0].orderId;
  }

  static async getInfo({ orderId }) {
    const info = await runQuery('CALL orders_get_order_info(?)', [orderId]);
    if (!info) return null;
    return info[0][0];
  }

  static async getShortDetails({ orderId }) {
    const details = await runQuery('CALL orders_get_order_short_details(?)', [orderId]);
    if (!details[0].length) return null;
    return details[0][0];
  }

  static async getCustomerOrders({ customerId }) {
    const orders = await runQuery('CALL orders_get_by_customer_id(?)', [customerId]);
    return orders[0];
  }
}

export default OrderModel;
