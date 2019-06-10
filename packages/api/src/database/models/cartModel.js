import runQuery from '..';
import ProductModel from './productModel';

class CartModel {
  static async add(details) {
    const { cartId, productId, attributes } = details;

    const product = await ProductModel.getByID({ productId });
    if (!product) return null;

    const itemId = await runQuery('CALL shopping_cart_add_product(?, ?, ?)', [
      cartId,
      productId,
      attributes,
    ]);

    return itemId[0][0].item_id;
  }

  static async updateQuantity({ itemId, quantity }) {
    const rows = await runQuery('CALL shopping_cart_update(?, ?)', [itemId, quantity]);
    if (rows.affectedRows === 0) return false;
    return true;
  }

  static async removeProduct({ itemId }) {
    const rows = await runQuery('CALL shopping_cart_remove_product(?)', [itemId]);
    if (rows.affectedRows === 0) return false;
    return true;
  }

  static async getTotal({ cartId }) {
    const total = await runQuery('CALL shopping_cart_get_total_amount(?)', [cartId]);
    return total[0][0].total_amount;
  }

  static async emptyCart({ cartId }) {
    const rows = await runQuery('CALL shopping_cart_empty(?)', [cartId]);
    return rows.affectedRows;
  }

  static async getProducts({ cartId }) {
    const products = await runQuery('CALL shopping_cart_get_products(?)', [cartId]);
    return products[0];
  }

  static async getSavedProducts({ cartId }) {
    const savedProducts = await runQuery('CALL shopping_cart_get_saved_products(?)', [cartId]);
    return savedProducts[0];
  }

  static async addToWishlist({ itemId }) {
    const rows = await runQuery('CALL shopping_cart_save_product_for_later(?)', [itemId]);
    if (rows.affectedRows === 0) return false;
    return true;
  }

  static async moveToCart({ itemId }) {
    const rows = await runQuery('CALL shopping_cart_move_product_to_cart(?)', [itemId]);
    if (rows.affectedRows === 0) return false;
    return true;
  }

  static async getCartIdByItem({ itemId }) {
    const cartId = await runQuery('SELECT cart_id FROM shopping_cart WHERE item_id = ?', [itemId]);
    return cartId[0].cart_id;
  }
}

export default CartModel;
