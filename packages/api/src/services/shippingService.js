import { ShippingModel } from '../database/models';

/**
 * This class contains all shipping related actions.
 * It is used by the shipping controller.
 * @class
 */
class ShippingService {
  /**
   * retrieves all shipping regions
   * @returns {Array} a list of all the shipping regions
   * @static
   */
  static async getAll() {
    const shippings = await ShippingModel.getAll();
    return shippings;
  }

  /**
   * retrieves a single shipping region's details
   * @returns {(Array|null)} the shipping region's details or null if not found
   * @static
   */
  static async getDetails(id) {
    const details = await ShippingModel.getDetails(id);
    if (!details) return [];

    return details;
  }
}

export default ShippingService;
