import Database from '..';

class AttributeModel {
  constructor() {
    this.DB = Database;
  }

  async getAll() {
    const attributes = await this.DB.query('CALL catalog_get_attributes()');
    return attributes[0];
  }

  async getByID(id) {
    const attribute = await this.DB.query('CALL catalog_get_attribute_details(?)', [id]);
    return attribute[0];
  }

  async getValues(id) {
    const values = await this.DB.query('CALL catalog_get_attribute_values(?)', [id]);
    return values[0];
  }

  async getProductAttributes(id) {
    const attributes = await this.DB.query('CALL catalog_get_product_attributes(?)', [id]);
    return attributes[0];
  }
}

export default AttributeModel;
