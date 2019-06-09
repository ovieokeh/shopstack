import { AttributeModel } from '../database/models';

/**
 * This class contains all attribute related actions.
 * It is used by the attribute controller.
 * @class
 */
class AttributeService {
  /**
   * retrieves all attributes
   * @returns {Array} a list of all the attributes
   * @static
   */
  static async getAll() {
    const attributes = await AttributeModel.getAll();
    return attributes;
  }

  /**
   * retrieves a single attribute by ID
   * @param {Number} id
   * @returns {(Object|null)} the attribute or null if not found
   * @static
   */
  static async get(id) {
    const attribute = await AttributeModel.getByID(id);
    return attribute[0];
  }

  /**
   * retrieves a single attribute's value by ID
   * @param {Number} id
   * @returns {(Array|null)} the value or null if not found
   * @static
   */
  static async getValues(id) {
    const value = await AttributeModel.getValues(id);
    return value;
  }

  /**
   * retrieves a product's attributes
   * @param {Number} id
   * @returns {(Array|null)} the attributes or null if not found
   * @static
   */
  static async getProductAttributes(id) {
    const attributes = await AttributeModel.getProductAttributes(id);
    if (!attributes) return [];

    return attributes;
  }
}

export default AttributeService;
