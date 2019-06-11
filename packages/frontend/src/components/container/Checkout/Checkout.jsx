import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { removeProductFromCart, updateItemQuantity } from '../../../actions/cartActions';
import { EmptyCart, QuantityUpdater } from '../../presentational';
import './Checkout.scss';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: 16,
  },
}));

const Checkout = ({ cart, customer, updateQuantity, removeItem }) => {
  window.document.title = 'Checkout | Shop Stack';

  const { items } = cart;
  const customerDetails = customer || {};
  const classes = useStyles();

  const handleQuantityChange = (event, itemId, quantity) => {
    const type = event.target.name;

    if (quantity === 1 && type === 'minus') return;

    if (type === 'minus') {
      updateQuantity({ itemId, quantity: quantity - 1 });
    } else {
      updateQuantity({ itemId, quantity: quantity + 1 });
    }
  };

  const handleRemoveItem = id => () => removeItem(id);

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
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="filled-dense"
            label="Name"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            defaultValue={customerDetails.name || ''}
            fullWidth
          />

          <TextField
            id="filled-dense"
            label="Email"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            defaultValue={customerDetails.email || ''}
            fullWidth
          />

          <TextField
            id="filled-dense"
            label="Phone"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            defaultValue={customerDetails.day_phone || ''}
            fullWidth
          />

          <TextField
            id="filled-dense"
            label="Country"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            defaultValue={customerDetails.country || ''}
            fullWidth
          />

          <TextField
            id="filled-dense"
            label="City"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            defaultValue={customerDetails.city || ''}
            fullWidth
          />

          <TextField
            id="filled-dense"
            label="Address"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            defaultValue={customerDetails.address_1 || ''}
            fullWidth
          />

          <TextField
            id="filled-dense"
            label="Postal Code"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            defaultValue={customerDetails.postal_code || ''}
            fullWidth
          />

          <button type="submit" className="order-button">
            Pay with Stripe
            <i className="fab fa-stripe-s" />
          </button>
        </form>
      </div>
    );
  };

  const renderOrderDetails = () => {
    return (
      <div className="order-details">
        <h3 className="ls-3 pd-10 uppercase center">Cart Summary</h3>
        <div className="content">
          {items.map(product => {
            return (
              <div key={product.item_id} className="product">
                <div className="left">
                  <img
                    className="product-image"
                    src={`https://backendapi.turing.com/images/products/${product.thumbnail}`}
                    alt={product.name}
                  />
                  <p>{product.name}</p>
                </div>
                <div className="product-details">
                  <div className="right">
                    <QuantityUpdater
                      quantity={product.quantity}
                      updateQuantity={event =>
                        handleQuantityChange(event, product.item_id, product.quantity)
                      }
                    />
                    <p className="price">${product.subtotal}</p>
                    <RemoveCircle
                      className="clear-icon"
                      onClick={handleRemoveItem(product.item_id)}
                    />
                  </div>
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

const mapDispatchToProps = dispatch => ({
  removeItem: itemId => dispatch(removeProductFromCart(itemId)),
  updateQuantity: details => dispatch(updateItemQuantity(details)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
