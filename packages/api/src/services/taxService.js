import { TaxModel } from '../database/models';

/**
 * This class contains all tax related actions.
 * It is used by the tax controller.
 * @class
 */
class TaxService {
  constructor() {
    this.TaxModel = new TaxModel();
  }

  /**
   * retrieves all taxes
   * @returns {Array} a list of all the taxes
   */
  async getAll() {
    const taxes = await this.TaxModel.getAll();
    return taxes;
  }

  /**
   * get's a single tax by it's ID
   * @param {Number} id
   * @returns {(Object|null)} the tax or null if not found
   */
  async get(id) {
    const tax = await this.TaxModel.getByID(id);
    return tax;
  }
}

export default TaxService;
