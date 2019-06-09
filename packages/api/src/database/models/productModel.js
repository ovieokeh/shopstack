import runQuery from '..';

class ProductModel {
  static async getAll(details) {
    const { descriptionLength, productsPerPage, startIndex } = details;
    const products = await runQuery('CALL catalog_get_products_on_catalog(?, ?, ?)', [
      descriptionLength,
      productsPerPage,
      startIndex,
    ]);
    return products[0];
  }

  static async countAllProducts() {
    const count = await runQuery('CALL catalog_count_products_on_catalog()');
    return count[0][0].products_on_catalog_count;
  }

  static async getByID({ productId }) {
    const product = await runQuery('SELECT * FROM product WHERE product_id = ?', [productId]);
    return product[0];
  }

  static async getProductAttributes({ productId }) {
    const product = await this.getByID({ productId });
    if (!product) return false;

    const attributes = await runQuery('CALL catalog_get_product_attributes(?)', [productId]);
    return attributes[0];
  }

  static async getProductDetails({ productId }) {
    const product = await this.getByID({ productId });
    if (!product) return false;

    const details = await runQuery('CALL catalog_get_product_details(?)', [productId]);
    return details[0];
  }

  static async getProductLocations({ productId }) {
    const product = await this.getByID({ productId });
    if (!product) return false;

    const locations = await runQuery('CALL catalog_get_product_locations(?)', [productId]);
    return locations[0][0];
  }

  static async getProductReviews({ productId }) {
    const product = await this.getByID({ productId });
    if (!product) return false;

    const reviews = await runQuery('CALL catalog_get_product_reviews(?)', [productId]);
    return reviews[0];
  }

  static async addReview(details) {
    const { customerId, productId, review, rating } = details;

    const product = await this.getByID({ productId });
    if (!product) return false;

    await runQuery('CALL catalog_create_product_review(?, ?, ?, ?)', [
      customerId,
      productId,
      review,
      rating,
    ]);

    return true;
  }

  static async getFromCategory(details) {
    const { categoryId, descriptionLength, productsPerPage, startIndex } = details;
    const products = await runQuery('CALL catalog_get_products_in_category(?, ?, ?, ?)', [
      categoryId,
      descriptionLength,
      productsPerPage,
      startIndex,
    ]);
    return products[0];
  }

  static async countProductsInCategory({ categoryId }) {
    const count = await runQuery('CALL catalog_count_products_in_category(?)', [categoryId]);
    return count[0][0].categories_count;
  }

  static async getFromDepartment(details) {
    const { departmentId, descriptionLength, productsPerPage, startIndex } = details;
    const products = await runQuery('CALL catalog_get_products_on_department(?, ?, ?, ?)', [
      departmentId,
      descriptionLength,
      productsPerPage,
      startIndex,
    ]);
    return products[0];
  }

  static async countProductsInDepartment({ departmentId }) {
    const count = await runQuery('CALL catalog_count_products_on_department(?)', [departmentId]);
    return count[0][0].products_on_department_count;
  }

  static async searchProduct(details) {
    const { searchString, isAllWords, descriptionLength, productsPerPage, startIndex } = details;
    const results = await runQuery('CALL catalog_search(?, ?, ?, ?, ?)', [
      searchString,
      isAllWords,
      descriptionLength,
      productsPerPage,
      startIndex,
    ]);
    return results;
  }

  static async countSearchResults({ searchString, isAllWords }) {
    const count = await runQuery('CALL catalog_count_search_result(?, ?)', [
      searchString,
      isAllWords,
    ]);
    return count[0][0]['count(*)'];
  }
}

export default ProductModel;
