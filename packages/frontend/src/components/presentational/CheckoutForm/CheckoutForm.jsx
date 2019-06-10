import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements';
import { postChargeRequest } from '../../../actions/stripeActions';
import { SnackBar } from '..';
import { history } from '../../../utilities';
import './CheckoutForm.scss';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
    };

    this.customer = this.props.customer;
    this.cart = this.props.cart;
    this.postCharge = this.props.postCharge;
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { token } = await this.props.stripe.createToken();
    await this.postCharge({
      amount: String(this.cart.totalPrice).replace('.', ''),
      receiptEmail: this.customer.email,
      source: token.id,
      orderId: 909,
    });

    this.setState({ success: true });
    setTimeout(() => {
      history.push('/customer');
    }, 500);
  };

  handleChange = change => {
    // do something
  };

  render() {
    return (
      <div className="checkout-form">
        {this.state.success && <SnackBar message="Payment Successful" />}
        <Link className="cancel-payment" to="/checkout">
          Cancel Payment
        </Link>
        <p>Amount: ${this.cart.totalPrice}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Card details
            <CardNumberElement onChange={this.handleChange} />
          </label>
          <label>
            Expiration date
            <CardExpiryElement onChange={this.handleChange} />
          </label>
          <label>
            CVC
            <CardCVCElement onChange={this.handleChange} />
          </label>
          <button className="order-button">Pay</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customer: state.auth.customer,
  cart: state.cart,
});
const mapDispatchToProps = dispatch => ({
  postCharge: details => dispatch(postChargeRequest(details)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectStripe(CheckoutForm));
