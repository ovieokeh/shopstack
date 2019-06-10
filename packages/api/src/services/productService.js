import { ProductModel } from '../database/models';

/**
 * This class contains all product related actions.
 * It is used by the product controller.
 * @class
 */
class ProductService {
  constructor() {
    this.ProductModel = new ProductModel();
  }

  /**
   * retrieves all products
   * @param {Object} params filtering options
   * @returns {Array} a list of all the products
   */
  async getAll(params) {
    const { limit, page, descriptionLength } = params;
    const offset = page === 1 ? 0 : page * limit - limit;

    const products = await this.ProductModel.getAll({
      descriptionLength,
      productsPerPage: limit,
      startIndex: offset,
    });
    const productCount = await this.ProductModel.countAllProducts();

    return { products, productCount };
  }

  /**
   * retrieves a single product by ID
   * @param {productId} number
   * @returns {(Object|null)} the product or null if not found
   */
  async get(productId) {
    const product = await this.ProductModel.getByID({ productId });
    if (!product) return null;
    product.attributes = await this.ProductModel.getProductAttributes({ productId });

    return product;
  }

  /**
   * searches for a product based on the query string plus other
   * conditions
   * @param {Object} params search parameters
   * @returns {Array} products that match the criteria
   */
  async search(params) {
    const { allWords, queryString, limit, page, descriptionLength } = params;
    const offset = page === 1 ? 0 : page * limit - limit;

    const results = await this.ProductModel.searchProduct({
      searchString: queryString,
      isAllWords: allWords,
      descriptionLength,
      productsPerPage: limit,
      startIndex: offset,
    });
    const resultCount = await this.ProductModel.countSearchResults({
      searchString: queryString,
      isAllWords: allWords,
    });

    return { results: results[0], resultCount };
  }

  /**
   * get's all products belonging to a single category
   * @param {Object} params search & filtering parameters
   * @returns {Array} products under the category
   */
  async getFromCategory(params) {
    const { categoryId, limit, page, descriptionLength } = params;
    const offset = page === 1 ? 0 : page * limit - limit;

    const products = await this.ProductModel.getFromCategory({
      categoryId,
      descriptionLength,
      productsPerPage: limit,
      startIndex: offset,
    });
    if (!products) return null;

    const productCount = await this.ProductModel.countProductsInCategory({ categoryId });

    return { products, productCount };
  }

  /**
   * get's all products belonging to a single department
   * @param {Object} params search & filtering parameters
   * @returns {Array} products under the department
   */
  async getFromDepartment(params) {
    const { departmentId, limit, page, descriptionLength } = params;
    const offset = page === 1 ? 0 : page * limit - limit;

    const products = await this.ProductModel.getFromDepartment({
      departmentId,
      descriptionLength,
      productsPerPage: limit,
      startIndex: offset,
    });
    if (!products) return null;

    const productCount = await this.ProductModel.countProductsInDepartment({ departmentId });

    return { products, productCount };
  }

  /**
   * get the locations (department & category) of a product
   * @param {Number} productId
   * @returns {Object}
   */
  async getLocations(productId) {
    const locations = await this.ProductModel.getProductLocations({ productId });
    if (!locations) return null;
    return locations;
  }

  /**
   * adds a review to a product
   * @param {Number} customerId
   * @param {Number} productId
   * @param {Object} rating contains review(String) & rating(Number)
   */
  async addReview(customerId, productId, rating) {
    const isReviewed = await this.ProductModel.addReview({
      customerId,
      productId,
      review: rating.review,
      rating: rating.rating,
    });

    return isReviewed;
  }

  /**
   * retrieves all reviews of a product
   * @param {Number} productId
   */
  async getReviews(productId) {
    const reviews = await this.ProductModel.getProductReviews({ productId });
    return reviews;
  }
}

export default ProductService;
