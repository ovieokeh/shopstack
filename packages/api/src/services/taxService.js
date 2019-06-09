import { TaxModel } from '../database/models';

/**
 * This class contains all tax related actions.
 * It is used by the tax controller.
 * @class
 */
class TaxService {
  /**
   * retrieves all taxes
   * @returns {Array} a list of all the taxes
   * @static
   */
  static async getAll() {
    const taxes = await TaxModel.getAll();
    return taxes;
  }

  /**
   * get's a single tax by it's ID
   * @param {Number} id
   * @returns {(Object|null)} the tax or null if not found
   * @static
   */
  static async get(id) {
    const tax = await TaxModel.getByID(id);
    return tax;
  }
}

export default TaxService;
