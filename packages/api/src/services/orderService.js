import { OrderModel } from '../database/models';

/**
 * This class contains all order related actions.
 * It is used by the order controller.
 * @class
 */
class OrderService {
  /**
   * creates a new order
   * @param {Object} details
   * @returns {String}
   * @static
   */
  static async postOrder(details) {
    const { customerId, cartId, shippingId, taxId } = details;

    const orderId = await OrderModel.add({ cartId, customerId, shippingId, taxId });
    if (!orderId) return null;

    return orderId;
  }

  /**
   * retrieves an order's information
   * @param {Number} orderId
   */
  static async getOrderInfo(orderId) {
    const info = await OrderModel.getInfo({ orderId });
    return info;
  }

  /**
   * retrieves the details of an order
   * @param {Number} orderId
   * @returns {Object}
   */
  static async getOrderDetails(orderId) {
    const details = await OrderModel.getShortDetails({ orderId });
    return details;
  }

  /**
   * retrieves a customer's orders
   * @param {Number} customerId
   * @returns {Array}
   */
  static async getCustomerOrders(customerId) {
    const orders = await OrderModel.getCustomerOrders({ customerId });
    return orders;
  }
}

export default OrderService;
