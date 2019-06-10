import { OrderModel } from '../database/models';

/**
 * This class contains all order related actions.
 * It is used by the order controller.
 * @class
 */
class OrderService {
  constructor() {
    this.OrderModel = new OrderModel();
  }

  /**
   * creates a new order
   * @param {Object} details
   * @returns {String}
   */
  async postOrder(details) {
    const { customerId, cartId, shippingId, taxId } = details;

    const orderId = await this.OrderModel.add({ cartId, customerId, shippingId, taxId });
    if (!orderId) return null;

    return orderId;
  }

  /**
   * retrieves an order's information
   * @param {Number} orderId
   */
  async getOrderInfo(orderId) {
    const info = await this.OrderModel.getInfo({ orderId });
    return info;
  }

  /**
   * retrieves the details of an order
   * @param {Number} orderId
   * @returns {Object}
   */
  async getOrderDetails(orderId) {
    const details = await this.OrderModel.getShortDetails({ orderId });
    return details;
  }

  /**
   * retrieves a customer's orders
   * @param {Number} customerId
   * @returns {Array}
   */
  async getCustomerOrders(customerId) {
    const orders = await this.OrderModel.getCustomerOrders({ customerId });
    return orders;
  }
}

export default OrderService;
