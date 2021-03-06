import { AttributeService } from '../services';
import { respond } from '../utilities';

/**
 * Handles all attribute related endpoints
 * @class
 */
class AttributeController {
  constructor() {
    this.AttributeService = new AttributeService();
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getValues = this.getValues.bind(this);
    this.getProductAttributes = this.getProductAttributes.bind(this);
  }

  /**
   * Handles the GET /attributes endpoint
   * @param {Object} _
   * @param {Object} response
   */
  async getAll(_, response) {
    try {
      const attributes = await this.AttributeService.getAll();
      respond(response, 'success', 200, 'attributes retrieved successfully', attributes);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /attributes/:id endpoint
   * @param {Object} request
   * @param {Object} response
   */
  async getOne(request, response) {
    try {
      const attributeId = request.params.id;
      const attribute = await this.AttributeService.get(attributeId);

      if (!attribute) {
        respond(response, 'error', 404, 'attribute not found');
        return;
      }

      respond(response, 'success', 200, 'attribute retrieved successfully', attribute);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /attributes/values/:id endpoint
   * @param {Object} request
   * @param {Object} response
   */
  async getValues(request, response) {
    try {
      const attributeId = request.params.id;
      const value = await this.AttributeService.getValues(attributeId);

      if (!value.length) {
        respond(response, 'error', 404, `value not found for attribute with ID ${attributeId}`);
        return;
      }

      respond(response, 'success', 200, 'attribute values retrieved successfully', value);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /attributes/inProduct/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @
   */
  async getProductAttributes(request, response) {
    try {
      const productId = request.params.id;
      const attributes = await this.AttributeService.getProductAttributes(productId);

      if (!attributes.length) {
        respond(response, 'error', 404, `attributes not found for product with ID ${productId}`);
        return;
      }

      respond(response, 'success', 200, 'product attributes retrieved successfully', attributes);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }
}

export default AttributeController;
