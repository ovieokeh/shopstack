import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeProductFromCart } from '../../../actions/cartActions';
import { EmptyCart } from '../../presentational';
import './Cart.scss';

const Cart = ({ cart, toggleCart, removeFromCart }) => {
  const handleRemoveFromCart = id => () => removeFromCart(id);

  if (!cart.count) return <EmptyCart onClick={toggleCart} />;

  return (
    <div className="nav-cart-details">
      <div className="cart-stats">
        <span>Number of items: {cart.count}</span>
      </div>

      <div className="cart-items">
        <p>Products</p>

        {cart.items.map(product => {
          const attributes = product.attributes.split(',');

          return (
            <div key={product.item_id} className="nav-cart-product">
              <img
                className="product-image"
                src={`https://backendapi.turing.com/images/products/${product.thumbnail}`}
                alt={product.name}
              />
              <div className="product-details">
                <p>{product.name}</p>
                <p className="price">${product.price}</p>
                <div className="attributes-container">
                  <small>Size: {attributes[0]}</small>
                  <br />
                  <small>Color: {attributes[1]}</small>
                </div>
                <small>Quantity: {product.quantity}</small>
                <button
                  onClick={handleRemoveFromCart(product.item_id)}
                  className="remove-product"
                  type="button"
                >
                  Remove product
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p>Total amount: ${cart.totalPrice}</p>
      <Link onClick={toggleCart} className="proceed-to-checkout-btn" to="/checkout">
        Proceed to checkout
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  removeFromCart: productId => dispatch(removeProductFromCart(productId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
