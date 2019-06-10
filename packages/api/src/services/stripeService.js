import stripe from '../stripe';

/**
 * This class contains all stripe related actions.
 * It is used by the stripe controller.
 * @class
 */
class StripeService {
  /**
   * posts a new charge
   * @returns {Object}
   * @static
   */
  static async postCharge(details) {
    const { amount, receiptEmail, source, orderId } = details;

    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source,
      receipt_email: receiptEmail,
      metadata: { order_id: orderId },
    });

    if (!charge) return null;

    return charge;
  }
}

export default StripeService;
