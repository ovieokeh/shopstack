import React, { Component } from 'react';
import { connect } from 'react-redux';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { getShippingTypesRequest } from '../../../actions/orderActions';
import {
  removeProductFromCart,
  updateItemQuantity,
  updateCart,
} from '../../../actions/cartActions';
import { EmptyCart, QuantityUpdater, ShippingDetailsForm } from '../../presentational';
import { setShippingRequest, setCustomerDetails } from '../../../actions/orderActions';
import './Checkout.scss';

const regions = [
  { value: 2, label: 'US / Canada' },
  { value: 3, label: 'Europe' },
  { value: 4, label: 'Rest of World' },
];

class Checkout extends Component {
  constructor(props) {
    super(props);

    const { customer } = this.props;

    const defaultRegion =
      customer && customer.region
        ? regions.filter(region => region.label === customer.region)[0]
        : regions[0];

    const customerDetails = customer || {};

    this.state = {
      shippingTypes: [],
      selectedRegion: defaultRegion,
      selectedShippingType: [],
      shippingDetails: {
        name: customerDetails.name || '',
        email: customerDetails.email || '',
        phone: customerDetails.day_phone || '',
        country: customerDetails.country || '',
        city: customerDetails.city || '',
        address: customerDetails.address_1 || '',
        postalCode: customerDetails.postal_code || '',
      },
    };
  }

  componentDidMount() {
    this.getShippingRegions();
  }

  getShippingRegions = async () => {
    let shippingTypes = await this.props.getShippingTypes(this.state.selectedRegion.value);

    const selectShipping = shippingTypes.map(type => ({
      id: type.shipping_id,
      label: type.shipping_type,
      value: type.shipping_cost,
    }));

    await this.setState({
      shippingTypes: selectShipping,
      selectedShippingType: selectShipping[0],
    });

    const { selectedShippingType } = this.state;

    this.props.setShippingCost(selectedShippingType.value, selectedShippingType.id);
    this.props.updateCartTotal(selectShipping[0].value);
  };

  handleCustomerDetailsChange = event => {
    this.setState({
      shippingDetails: {
        ...this.state.shippingDetails,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleShippingTypeChange = async selectedOption => {
    await this.setState({
      selectedShippingType: selectedOption,
    });

    const { selectedShippingType } = this.state;

    this.props.setShippingCost(selectedShippingType.value, selectedShippingType.id);
    this.props.updateCartTotal(this.state.selectedShippingType.value);
  };

  handleRegionSelect = async selectedOption => {
    await this.setState({
      selectedRegion: selectedOption,
    });

    this.getShippingRegions();
  };

  handleQuantityChange = (event, itemId, quantity) => {
    const type = event.target.name;
    if (quantity === 1 && type === 'minus') return;

    if (type === 'minus') {
      this.props.updateQuantity({ itemId, quantity: quantity - 1 });
    } else {
      this.props.updateQuantity({ itemId, quantity: quantity + 1 });
    }
  };

  handleRemoveItem = id => () => this.props.removeItem(id);

  handleFormSubmit = async event => {
    event.preventDefault();
    await this.props.setCustomerDetails(this.state.shippingDetails);
    this.props.history.push('/pay');
  };

  renderOrderDetails = () => {
    const { items } = this.props.cart;

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
                        this.handleQuantityChange(event, product.item_id, product.quantity)
                      }
                    />
                    <p className="price">${product.subtotal}</p>
                    <RemoveCircle
                      className="clear-icon"
                      onClick={this.handleRemoveItem(product.item_id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="order-summary">
          <p>Subtotal: ${this.props.cart.subtotal}</p>
          <p>Shipping: ${this.state.selectedShippingType.value || 0.0}</p>
          <p>Taxes: 0.0%</p>

          <p className="total-price">Total: ${this.props.cart.totalPrice}</p>
        </div>
      </div>
    );
  };

  render() {
    if (!this.props.cart.count)
      return (
        <div className="checkout-container">
          <EmptyCart />
        </div>
      );

    return (
      <div className="checkout-container">
        <ShippingDetailsForm
          customer={this.state.shippingDetails}
          shippingTypes={this.state.shippingTypes}
          selectedRegion={this.state.selectedRegion}
          selectedShippingType={this.state.selectedShippingType}
          handleCustomerDetailsChange={this.handleCustomerDetailsChange}
          handleShippingType={this.handleShippingTypeChange}
          handleRegionSelect={this.handleRegionSelect}
          handleFormSubmit={this.handleFormSubmit}
          regions={regions}
        />
        {this.renderOrderDetails()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  customer: state.auth.customer,
});

const mapDispatchToProps = dispatch => ({
  removeItem: itemId => dispatch(removeProductFromCart(itemId)),
  updateQuantity: details => dispatch(updateItemQuantity(details)),
  getShippingTypes: id => dispatch(getShippingTypesRequest(id)),
  updateCartTotal: shippingFee => dispatch(updateCart(shippingFee)),
  setShippingCost: (cost, id) => dispatch(setShippingRequest(cost, id)),
  setCustomerDetails: details => dispatch(setCustomerDetails(details)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
