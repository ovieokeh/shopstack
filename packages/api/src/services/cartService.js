import shortID from 'short-uuid';
import { CartModel } from '../database/models';

/**
 * This class contains all tax related actions.
 * It is used by the tax controller.
 * @class
 */
class CartService {
  constructor() {
    this.CartModel = new CartModel();
  }

  /**
   * generates a unique ID for a new cart
   * @returns {String}
   */
  static async generateId() {
    const id = shortID.generate();
    return id;
  }

  /**
   * adds a product to a cart
   * @param {Object} details
   * @returns {Array} of products in the cart
   */
  async addToCart(details) {
    const { cartId, productId, attributes, quantity } = details;

    const itemId = await this.CartModel.add({ cartId, productId, attributes });
    if (!itemId) return null;

    if (quantity > 1) {
      this.CartModel.updateQuantity({ itemId, quantity });
    }

    const products = await this.CartModel.getProducts({ cartId });
    return products;
  }

  /**
   * retrieves all the products in a cart
   * @param {Number} cartId of the cart
   * @returns {Array} of products in the cart
   */
  async getAllProducts(cartId) {
    const products = await this.CartModel.getProducts({ cartId });
    if (!products.length) return null;

    return products;
  }

  /**
   * updates the quantity of a product in the cart
   * @param {Number} itemId
   * @param {Number} quantity
   * @returns {Array} of items in the cart
   */
  async updateItemQuantity(itemId, quantity) {
    const isUpdated = await this.CartModel.updateQuantity({ itemId, quantity });
    if (!isUpdated) return 'item404';

    const cartId = await this.CartModel.getCartIdByItem({ itemId });
    return this.getAllProducts(cartId);
  }

  /**
   * removes all products from a cart
   * @param {Number} cartId
   * @returns {Array}
   */
  async emptyCart(cartId) {
    const isEmptied = await this.CartModel.emptyCart({ cartId });
    if (!isEmptied) return null;
    return [];
  }

  /**
   * saves an item to be purchased later
   * @param {Number} item
   * @returns {Boolean}
   */
  async saveForLater(itemId) {
    const isSaved = await this.CartModel.addToWishlist({ itemId });
    return isSaved;
  }

  /**
   * retrieves all items saved for later
   * @param {String} cartId
   * @returns {Array}
   */
  async getSavedForLater(cartId) {
    const products = await this.CartModel.getSavedProducts({ cartId });
    return products;
  }

  /**
   * changes an item's buyNow status to true
   * @param {Number} itemId
   * @returns {Boolean}
   */
  async moveToBuyNow(itemId) {
    const isMoved = await this.CartModel.moveToCart({ itemId });
    return isMoved;
  }

  /**
   * remove an item from the cart
   * @param {Number} itemId
   * @returns {Boolean}
   */
  async removeFromCart(itemId) {
    const isRemoved = await this.CartModel.removeProduct({ itemId });
    return isRemoved;
  }

  /**
   * get the total cost of items in a cart
   * @param {Number} cartId
   * @returns {Boolean}
   */
  async getTotalAmount(cartId) {
    const cart = await this.getAllProducts(cartId);
    if (!cart) return null;

    const totalAmount = await this.CartModel.getTotal({ cartId });
    return { totalAmount };
  }
}

export default CartService;
