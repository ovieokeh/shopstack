import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { EmptyCart } from '../../presentational';
import './Checkout.scss';

const Checkout = ({ cart, customer }) => {
  window.document.title = 'Checkout | Shop Stack';

  const { items } = cart;
  const customerDetails = customer || {};

  const renderShippingDetails = () => {
    return (
      <div className="shipping-details">
        {!customer && (
          <div className="no-customer">
            <p>Already have an account?</p>
            <Link to="/login">Login here</Link>
          </div>
        )}

        <h3 className="ls-3 pd-10 uppercase center">Shipping Details</h3>

        <div className={`detail-group`}>
          <label htmlFor="name">Name:</label>
          <input name="name" defaultValue={customerDetails.name || ''} type="text" required />
        </div>

        <div className={`detail-group`}>
          <label htmlFor="email">Email:</label>
          <input name="email" defaultValue={customerDetails.email || ''} type="text" required />
        </div>

        <div className={`detail-group`}>
          <label htmlFor="dayPhone">Phone:</label>
          <input
            name="dayPhone"
            defaultValue={customerDetails.day_phone || ''}
            type="text"
            required
          />
        </div>

        <div className={`detail-group`}>
          <label htmlFor="country">Country:</label>
          <input name="country" defaultValue={customerDetails.country || ''} type="text" required />
        </div>

        <div className={`detail-group`}>
          <label htmlFor="city">City:</label>
          <input name="city" defaultValue={customerDetails.city || ''} type="text" required />
        </div>

        <div className={`detail-group`}>
          <label htmlFor="address">Address:</label>
          <input
            name="address"
            defaultValue={customerDetails.address_1 || ''}
            type="text"
            required
          />
        </div>

        <div className={`detail-group`}>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            name="postalCode"
            defaultValue={customerDetails.postal_code || ''}
            type="text"
            required
          />
        </div>

        <Link to="/pay" className="order-button">
          Pay with Stripe
          <i className="fab fa-stripe-s" />
        </Link>
      </div>
    );
  };

  const renderOrderDetails = () => {
    return (
      <div className="order-details">
        <h3 className="ls-3 pd-10 uppercase center">Cart Summary</h3>
        <div>
          {items.map(product => {
            return (
              <div key={product.item_id} className="product">
                <div className="product-details">
                  <img
                    className="product-image"
                    src={`https://backendapi.turing.com/images/products/${product.thumbnail}`}
                    alt={product.name}
                  />
                  <p>
                    {product.quantity} x {product.name}
                  </p>
                  <p className="price">${product.price}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="order-summary">
          <p>Subtotal: ${cart.totalPrice}</p>
          <p>Shipping: Free</p>
          <p>Taxes: 0.0%</p>

          <p className="total-price">Total: ${cart.totalPrice}</p>
        </div>
      </div>
    );
  };

  if (!cart.count)
    return (
      <div className="checkout-container">
        <EmptyCart />
      </div>
    );

  return (
    <div className="checkout-container">
      {renderShippingDetails()}
      {renderOrderDetails()}
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart,
  customer: state.auth.customer,
});

export default connect(mapStateToProps)(Checkout);
