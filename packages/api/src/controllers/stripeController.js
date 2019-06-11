import { StripeService } from '../services';
import { respond } from '../utilities';

/**
 * Handles all stripe related endpoints
 * @class
 */
class StripeController {
  static async createCustomer(request, response) {
    const { customerDetails, source } = request.body;
    const newCustomer = {
      name: customerDetails.name,
      email: customerDetails.email,
      phone: customerDetails.phone,
      address: {
        line1: customerDetails.address,
        city: customerDetails.city,
        postal_code: customerDetails.postalCode,
      },
      shipping: {
        address: {
          line1: customerDetails.address,
          city: customerDetails.city,
          postal_code: customerDetails.postalCode,
        },
        name: customerDetails.name,
      },
    };

    try {
      const customer = await StripeService.createCustomer(newCustomer, source);
      respond(response, 'success', 201, 'customer created successfully', customer);
    } catch (error) {
      console.log(error.message);
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the POST /stripe/charge endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async postCharge(request, response) {
    try {
      const { amount, source, orderId, receiptEmail } = request.body;

      const charge = await StripeService.postCharge({
        amount,
        source,
        receiptEmail,
        orderId,
      });

      respond(response, 'success', 200, 'charge posted successfully', charge);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  static async handleWebhooks(_, response) {
    try {
      // do something
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }
}

export default StripeController;
