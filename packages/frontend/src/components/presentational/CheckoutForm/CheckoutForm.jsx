import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements';
import { postChargeRequest, createCustomerRequest } from '../../../actions/stripeActions';
import { SnackBar } from '..';
import './CheckoutForm.scss';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      receiptUrl: '',
    };

    this.customer = this.props.customer;
    this.cart = this.props.cart;
    this.postCharge = this.props.postCharge;
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { customerDetails } = this.props;

    const { token } = await this.props.stripe.createToken({
      name: customerDetails.name,
    });

    await this.props.createCustomer({ customerDetails, source: token.id });

    const res = await this.props.stripe.createToken({
      name: customerDetails.name,
    });

    const secondToken = res.token;

    const order = await this.postCharge({
      amount: String(this.cart.totalPrice).replace('.', ''),
      source: secondToken.id,
      receiptEmail: customerDetails.email,
    });

    if (!order) {
      this.setState({ success: 'error' });
    }

    this.setState({ success: true, receiptUrl: order.receipt_url });
  };

  handleChange = change => {
    // do something
  };

  render() {
    return (
      <div className="checkout-form">
        {this.state.success === 'error' && (
          <SnackBar variant="error" message="Payment Unsuccessful" />
        )}
        {this.state.success && (
          <SnackBar
            variant="success"
            message={
              <div className="snackbar-div">
                <p>
                  Payment Successful! <a href={this.state.receiptUrl}>View receipt</a>
                </p>
                <a href="/customer">My profile</a>
              </div>
            }
          />
        )}
        {!this.state.success && (
          <Link className="cancel-payment" to="/checkout">
            Cancel Payment
          </Link>
        )}
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
  customerDetails: state.order.customerDetails,
});
const mapDispatchToProps = dispatch => ({
  postCharge: details => dispatch(postChargeRequest(details)),
  createCustomer: details => dispatch(createCustomerRequest(details)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectStripe(CheckoutForm));
