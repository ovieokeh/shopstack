import runQuery from '..';

class AttributeModel {
  static async getAll() {
    const attributes = await runQuery('CALL catalog_get_attributes()');
    return attributes;
  }

  static async getByID(id) {
    const attribute = await runQuery('CALL catalog_get_attribute_details(?)', [id]);
    return attribute;
  }

  static async getValues(id) {
    const values = await runQuery('CALL catalog_get_attribute_values(?)', [id]);
    return values;
  }

  static async getProductAttributes(id) {
    const attributes = await runQuery('CALL catalog_get_product_attributes(?)', [id]);
    return attributes;
  }
}

export default AttributeModel;
