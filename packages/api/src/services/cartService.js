import shortID from 'short-uuid';
import { CartModel } from '../database/models';

/**
 * This class contains all tax related actions.
 * It is used by the tax controller.
 * @class
 */
class CartService {
  /**
   * generates a unique ID for a new cart
   * @returns {String}
   * @static
   */
  static async generateId() {
    const id = shortID.generate();
    return id;
  }

  /**
   * adds a product to a cart
   * @param {Object} details
   * @returns {Array} of products in the cart
   * @static
   */
  static async addToCart(details) {
    const { cartId, productId, attributes, quantity } = details;

    const itemId = await CartModel.add({ cartId, productId, attributes });
    if (!itemId) return null;

    if (quantity > 1) {
      CartModel.updateQuantity({ itemId, quantity });
    }

    const products = await CartModel.getProducts({ cartId });
    return products;
  }

  /**
   * retrieves all the products in a cart
   * @param {Number} cartId of the cart
   * @returns {Array} of products in the cart
   * @static
   */
  static async getAllProducts(cartId) {
    const products = await CartModel.getProducts({ cartId });
    if (!products.length) return null;

    return products;
  }

  /**
   * updates the quantity of a product in the cart
   * @param {Number} itemId
   * @param {Number} quantity
   * @returns {Array} of items in the cart
   */
  static async updateItemQuantity(itemId, quantity) {
    const isUpdated = await CartModel.updateQuantity({ itemId, quantity });
    if (!isUpdated) return 'item404';

    const cartId = await CartModel.getCartIdByItem({ itemId });
    return this.getAllProducts(cartId);
  }

  /**
   * removes all products from a cart
   * @param {Number} cartId
   * @returns {Array}
   */
  static async emptyCart(cartId) {
    const isEmptied = await CartModel.emptyCart({ cartId });
    if (!isEmptied) return null;
    return [];
  }

  /**
   * saves an item to be purchased later
   * @param {Number} item
   * @returns {Boolean}
   */
  static async saveForLater(itemId) {
    const isSaved = await CartModel.addToWishlist({ itemId });
    return isSaved;
  }

  /**
   * retrieves all items saved for later
   * @param {String} cartId
   * @returns {Array}
   */
  static async getSavedForLater(cartId) {
    const products = await CartModel.getSavedProducts({ cartId });
    return products;
  }

  /**
   * changes an item's buyNow status to true
   * @param {Number} itemId
   * @returns {Boolean}
   */
  static async moveToBuyNow(itemId) {
    const isMoved = await CartModel.moveToCart({ itemId });
    return isMoved;
  }

  /**
   * remove an item from the cart
   * @param {Number} itemId
   * @returns {Boolean}
   */
  static async removeFromCart(itemId) {
    const isRemoved = await CartModel.removeProduct({ itemId });
    return isRemoved;
  }

  /**
   * get the total cost of items in a cart
   * @param {Number} cartId
   * @returns {Boolean}
   */
  static async getTotalAmount(cartId) {
    const cart = await this.getAllProducts(cartId);
    if (!cart) return null;

    const totalAmount =
      cart.length === 1
        ? Number(cart[0].subtotal)
        : cart.reduce((prev, cur) => Number(prev.subtotal) + Number(cur.subtotal));

    return { totalAmount: totalAmount.toFixed(2) };
  }
}

export default CartService;
