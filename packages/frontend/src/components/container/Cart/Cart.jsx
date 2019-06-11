import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeProductFromCart, updateItemQuantity } from '../../../actions/cartActions';
import { EmptyCart, QuantityUpdater } from '../../presentational';
import './Cart.scss';

const Cart = ({ cart, toggleCart, removeFromCart, updateQuantity }) => {
  const handleRemoveFromCart = id => () => removeFromCart(id);

  const handleQuantityChange = (event, itemId, quantity) => {
    const type = event.target.name;

    if (quantity === 1 && type === 'minus') return;

    if (type === 'minus') {
      updateQuantity({ itemId, quantity: quantity - 1 });
    } else {
      updateQuantity({ itemId, quantity: quantity + 1 });
    }
  };

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
              <div className="product-left">
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
                </div>
              </div>
              <div className="product-right">
                <div className="quantity-updater">
                  <QuantityUpdater
                    quantity={product.quantity}
                    updateQuantity={event =>
                      handleQuantityChange(event, product.item_id, product.quantity)
                    }
                  />
                </div>

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
  updateQuantity: details => dispatch(updateItemQuantity(details)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
