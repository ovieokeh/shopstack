import Database from '..';

class ProductModel {
  constructor() {
    this.DB = Database;
  }

  async getAll(details) {
    const { descriptionLength, productsPerPage, startIndex } = details;
    const products = await this.DB.query('CALL catalog_get_products_on_catalog(?, ?, ?)', [
      descriptionLength,
      productsPerPage,
      startIndex,
    ]);
    return products[0];
  }

  async countAllProducts() {
    const count = await this.DB.query('CALL catalog_count_products_on_catalog()');
    return count[0][0].products_on_catalog_count;
  }

  async getByID({ productId }) {
    const product = await this.DB.query('SELECT * FROM product WHERE product_id = ?', [productId]);
    return product[0];
  }

  async getProductAttributes({ productId }) {
    const product = await this.getByID({ productId });
    if (!product) return false;

    const attributes = await this.DB.query('CALL catalog_get_product_attributes(?)', [productId]);
    return attributes[0];
  }

  async getProductDetails({ productId }) {
    const product = await this.getByID({ productId });
    if (!product) return false;

    const details = await this.DB.query('CALL catalog_get_product_details(?)', [productId]);
    return details[0];
  }

  async getProductLocations({ productId }) {
    const product = await this.getByID({ productId });
    if (!product) return false;

    const locations = await this.DB.query('CALL catalog_get_product_locations(?)', [productId]);
    return locations[0][0];
  }

  async getProductReviews({ productId }) {
    const product = await this.getByID({ productId });
    if (!product) return false;

    const reviews = await this.DB.query('CALL catalog_get_product_reviews(?)', [productId]);
    return reviews[0];
  }

  async addReview(details) {
    const { customerId, productId, review, rating } = details;

    const product = await this.getByID({ productId });
    if (!product) return false;

    await this.DB.query('CALL catalog_create_product_review(?, ?, ?, ?)', [
      customerId,
      productId,
      review,
      rating,
    ]);

    return true;
  }

  async getFromCategory(details) {
    const { categoryId, descriptionLength, productsPerPage, startIndex } = details;
    const products = await this.DB.query('CALL catalog_get_products_in_category(?, ?, ?, ?)', [
      categoryId,
      descriptionLength,
      productsPerPage,
      startIndex,
    ]);
    return products[0];
  }

  async countProductsInCategory({ categoryId }) {
    const count = await this.DB.query('CALL catalog_count_products_in_category(?)', [categoryId]);
    return count[0][0].categories_count;
  }

  async getFromDepartment(details) {
    const { departmentId, descriptionLength, productsPerPage, startIndex } = details;
    const products = await this.DB.query('CALL catalog_get_products_on_department(?, ?, ?, ?)', [
      departmentId,
      descriptionLength,
      productsPerPage,
      startIndex,
    ]);
    return products[0];
  }

  async countProductsInDepartment({ departmentId }) {
    const count = await this.DB.query('CALL catalog_count_products_on_department(?)', [
      departmentId,
    ]);
    return count[0][0].products_on_department_count;
  }

  async searchProduct(details) {
    const { searchString, isAllWords, descriptionLength, productsPerPage, startIndex } = details;
    const results = await this.DB.query('CALL catalog_search(?, ?, ?, ?, ?)', [
      searchString,
      isAllWords,
      descriptionLength,
      productsPerPage,
      startIndex,
    ]);
    return results;
  }

  async countSearchResults({ searchString, isAllWords }) {
    const count = await this.DB.query('CALL catalog_count_search_result(?, ?)', [
      searchString,
      isAllWords,
    ]);
    return count[0][0]['count(*)'];
  }
}

export default ProductModel;
