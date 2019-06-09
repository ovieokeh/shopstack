import { StripeService } from '../services';
import { respond } from '../utilities';

/**
 * Handles all stripe related endpoints
 * @class
 */
class StripeController {
  /**
   * Handles the POST /stripe/charge endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async postCharge(request, response) {
    try {
      const { amount, source, receiptEmail, orderId } = request.body;
      const charge = await StripeService.postCharge({ amount, source, receiptEmail, orderId });

      respond(response, 'success', 200, 'charge posted successfully', charge);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  static async handleWebhooks(request, response) {
    try {
      const hook = request.body;
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }
}

export default StripeController;
