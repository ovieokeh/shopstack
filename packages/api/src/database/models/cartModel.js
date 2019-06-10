import Database from '..';

import ProductModel from './productModel';

class CartModel {
  constructor() {
    this.DB = Database;
    this.ProductModel = new ProductModel();
  }

  async add(details) {
    const { cartId, productId, attributes } = details;

    const product = await this.ProductModel.getByID({ productId });
    if (!product) return null;

    const itemId = await this.DB.query('CALL shopping_cart_add_product(?, ?, ?)', [
      cartId,
      productId,
      attributes,
    ]);

    return itemId[0][0].item_id;
  }

  async updateQuantity({ itemId, quantity }) {
    const rows = await this.DB.query('CALL shopping_cart_update(?, ?)', [itemId, quantity]);
    if (rows.affectedRows === 0) return false;
    return true;
  }

  async removeProduct({ itemId }) {
    const rows = await this.DB.query('CALL shopping_cart_remove_product(?)', [itemId]);
    if (rows.affectedRows === 0) return false;
    return true;
  }

  async getTotal({ cartId }) {
    const total = await this.DB.query('CALL shopping_cart_get_total_amount(?)', [cartId]);
    return total[0][0].total_amount;
  }

  async emptyCart({ cartId }) {
    const rows = await this.DB.query('CALL shopping_cart_empty(?)', [cartId]);
    return rows.affectedRows;
  }

  async getProducts({ cartId }) {
    const products = await this.DB.query('CALL shopping_cart_get_products(?)', [cartId]);
    return products[0];
  }

  async getSavedProducts({ cartId }) {
    const savedProducts = await this.DB.query('CALL shopping_cart_get_saved_products(?)', [cartId]);
    return savedProducts[0];
  }

  async addToWishlist({ itemId }) {
    const rows = await this.DB.query('CALL shopping_cart_save_product_for_later(?)', [itemId]);
    if (rows.affectedRows === 0) return false;
    return true;
  }

  async moveToCart({ itemId }) {
    const rows = await this.DB.query('CALL shopping_cart_move_product_to_cart(?)', [itemId]);
    if (rows.affectedRows === 0) return false;
    return true;
  }

  async getCartIdByItem({ itemId }) {
    const cartId = await this.DB.query('SELECT cart_id FROM shopping_cart WHERE item_id = ?', [
      itemId,
    ]);
    return cartId[0].cart_id;
  }
}

export default CartModel;
