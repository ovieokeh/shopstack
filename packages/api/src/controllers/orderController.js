import { OrderService } from '../services';
import { respond } from '../utilities';

/**
 * Handles all order related endpoints
 * @class
 */
class OrderController {
  constructor() {
    this.OrderService = new OrderService();
    this.postOrder = this.postOrder.bind(this);
    this.getOrderInfo = this.getOrderInfo.bind(this);
    this.getOrderDetails = this.getOrderDetails.bind(this);
    this.getCustomerOrders = this.getCustomerOrders.bind(this);
  }

  /**
   * Handles the POST /order endpoint
   * @param {Object} request
   * @param {Object} response
   */
  async postOrder(request, response) {
    try {
      const {
        customer: { customer_id },
      } = request;
      const { cartId, shippingId, taxId } = request.body;

      const order = await this.OrderService.postOrder({
        customerId: customer_id,
        cartId,
        shippingId,
        taxId,
      });

      if (!order) {
        respond(response, 'error', 404, 'cart not found');
        return;
      }

      respond(response, 'success', 201, 'order posted successfully', order);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /orders/:id endpoint
   * @param {Object} request
   * @param {Object} response
   */
  async getOrderInfo(request, response) {
    try {
      const orderId = request.params.id;

      const orderInfo = await this.OrderService.getOrderInfo(orderId);
      if (!orderInfo.length) {
        respond(response, 'error', 404, 'order not found');
        return;
      }

      respond(response, 'success', 200, 'order info retrieved successfully', orderInfo);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /orders/shortDetail/:id endpoint
   * @param {Object} request
   * @param {Object} response
   */
  async getOrderDetails(request, response) {
    try {
      const orderId = request.params.id;

      const orderDetails = await this.OrderService.getOrderDetails(orderId);
      if (!orderDetails) {
        respond(response, 'error', 404, 'order not found');
        return;
      }

      respond(response, 'success', 200, 'order details retrieved successfully', orderDetails);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /orders/inCustomer endpoint
   * @param {Object} request
   * @param {Object} response
   */
  async getCustomerOrders(request, response) {
    try {
      const { customer_id } = request.customer;

      const orders = await this.OrderService.getCustomerOrders(customer_id);

      respond(response, 'success', 200, 'customer orders retrieved successfully', orders);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }
}

export default OrderController;
