import { ShippingModel } from '../database/models';

/**
 * This class contains all shipping related actions.
 * It is used by the shipping controller.
 * @class
 */
class ShippingService {
  constructor() {
    this.ShippingModel = new ShippingModel();
  }

  /**
   * retrieves all shipping regions
   * @returns {Array} a list of all the shipping regions
   */
  async getAll() {
    const shippings = await this.ShippingModel.getAll();
    return shippings;
  }

  /**
   * retrieves a single shipping region's details
   * @returns {(Array|null)} the shipping region's details or null if not found
   */
  async getDetails(id) {
    const details = await this.ShippingModel.getDetails(id);
    if (!details) return [];

    return details;
  }
}

export default ShippingService;
