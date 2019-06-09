import { CartService } from '../services';
import { respond } from '../utilities';

/**
 * Handles shoppingcart related endpoints
 * @class
 */
class CartController {
  /**
   * Handles the GET /shoppingcart/generateUniqueId endpoint
   * @param {Object} _
   * @param {Object} response
   * @static
   */
  static async generateUniqueId(_, response) {
    try {
      const id = await CartService.generateId();
      respond(response, 'success', 200, 'unique id generated successfully', id);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the POST /shoppingcart/add endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async addToCart(request, response) {
    try {
      const { cartId, productId, attributes, quantity } = request.body;
      const productsInCart = await CartService.addToCart({
        cartId,
        productId,
        attributes,
        quantity,
      });

      if (!productsInCart) {
        respond(response, 'error', 404, 'product not found');
        return;
      }

      respond(response, 'success', 201, 'product added to cart successfully', productsInCart);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /shoppingcart/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async getProductsInCart(request, response) {
    try {
      const cartId = request.params.id;

      const products = await CartService.getAllProducts(cartId);
      if (!products) {
        respond(response, 'error', 404, 'cart not found');
        return;
      }

      respond(response, 'success', 200, 'products retrieved successfully', products);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the PUT /shoppingcart/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async updateProductQuantity(request, response) {
    try {
      const itemId = request.params.id;
      const { quantity } = request.body;

      const updatedItem = await CartService.updateItemQuantity(itemId, quantity);

      if (updatedItem === 'item404') {
        respond(response, 'error', 404, 'item not found');
        return;
      }

      respond(response, 'success', 200, 'item quantity updated successfully', updatedItem);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the DELETE /shoppingcart/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async clear(request, response) {
    try {
      const cartId = request.params.id;
      const cart = await CartService.emptyCart(cartId);

      if (!cart) {
        respond(response, 'error', 404, 'cart not found');
        return;
      }

      respond(response, 'success', 200, 'cart cleared successfully', cart);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /shoppingcart/saveForLater/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async saveForLater(request, response) {
    try {
      const itemId = request.params.id;
      const isSaved = await CartService.saveForLater(itemId);

      if (!isSaved) {
        respond(response, 'error', 404, 'item not found');
        return;
      }

      respond(response, 'success', 200, 'item saved for later successfully');
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /shoppingcart/getSaved/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async getSavedItems(request, response) {
    try {
      const cartId = request.params.id;
      const items = await CartService.getSavedForLater(cartId);

      if (!items.length) {
        respond(response, 'error', 404, `no saved items found for cart with ID ${cartId}`);
        return;
      }

      respond(response, 'success', 200, 'items retrieved successfully', items);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /shoppingcart/moveToCart/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async moveToCart(request, response) {
    try {
      const itemId = request.params.id;
      const isMoved = await CartService.moveToBuyNow(itemId);

      if (!isMoved) {
        respond(response, 'error', 404, 'item not found');
        return;
      }

      respond(response, 'success', 200, 'item moved successfully');
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the DELETE /shoppingcart/removeProduct/:id endpoint
   * @param {Object} request
   * @param {Object} response
   */
  static async removeFromCart(request, response) {
    try {
      const itemId = request.params.id;
      const isRemoved = await CartService.removeFromCart(itemId);

      if (!isRemoved) {
        respond(response, 'error', 404, 'item not found');
        return;
      }

      respond(response, 'success', 200, 'item removed successfully');
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /shoppingcart/totalAmount/:id endpoint
   * @param {Object} request
   * @param {Object} response
   */
  static async getTotalAmount(request, response) {
    try {
      const cartId = request.params.id;

      const result = await CartService.getTotalAmount(cartId);
      if (!result) {
        respond(response, 'error', 404, 'cart not found');
        return;
      }

      respond(response, 'success', 200, 'total amount retrieved successfully', result);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }
}

export default CartController;
