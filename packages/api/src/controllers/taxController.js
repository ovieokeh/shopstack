import { TaxService } from '../services';
import { respond } from '../utilities';

/**
 * Handles all tax related endpoints
 * @class
 */
class TaxController {
  constructor() {
    this.TaxService = new TaxService();
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
  }

  /**
   * Handles the GET /tax endpoint
   * @param {Object} _
   * @param {Object} response
   */
  async getAll(_, response) {
    try {
      const taxes = await this.TaxService.getAll();
      respond(response, 'success', 200, 'taxes retrieved successfully', taxes);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /tax/:id endpoint
   * @param {Object} request
   * @param {Object} response
   */
  async getOne(request, response) {
    try {
      const taxId = request.params.id;
      const tax = await this.TaxService.get(taxId);

      if (!tax) {
        respond(response, 'error', 404, 'tax not found');
        return;
      }

      respond(response, 'success', 200, 'taxes retrieved successfully', tax);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }
}

export default TaxController;
