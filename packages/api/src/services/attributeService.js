import { AttributeModel } from '../database/models';

/**
 * This class contains all attribute related actions.
 * It is used by the attribute controller.
 * @class
 */
class AttributeService {
  constructor() {
    this.AttributeModel = new AttributeModel();
  }

  /**
   * retrieves all attributes
   * @returns {Array} a list of all the attributes
   */
  async getAll() {
    const attributes = await this.AttributeModel.getAll();
    return attributes;
  }

  /**
   * retrieves a single attribute by ID
   * @param {Number} id
   * @returns {(Object|null)} the attribute or null if not found
   */
  async get(id) {
    const attribute = await this.AttributeModel.getByID(id);
    return attribute[0];
  }

  /**
   * retrieves a single attribute's value by ID
   * @param {Number} id
   * @returns {(Array|null)} the value or null if not found
   */
  async getValues(id) {
    const value = await this.AttributeModel.getValues(id);
    return value;
  }

  /**
   * retrieves a product's attributes
   * @param {Number} id
   * @returns {(Array|null)} the attributes or null if not found
   */
  async getProductAttributes(id) {
    const attributes = await this.AttributeModel.getProductAttributes(id);
    if (!attributes) return [];

    return attributes;
  }
}

export default AttributeService;
