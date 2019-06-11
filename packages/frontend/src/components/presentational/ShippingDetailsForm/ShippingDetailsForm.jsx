import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import clsx from 'clsx';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './ShippingDetailsForm.scss';

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

const ShippingDetailsForm = ({
  customer,
  handleFormSubmit,
  shippingTypes,
  selectedShippingType,
  handleCustomerDetailsChange,
  handleShippingType,
  selectedRegion,
  handleRegionSelect,
  regions,
}) => {
  const customerDetails = customer || {};
  const classes = useStyles();

  return (
    <div className="shipping-details">
      {!customer && (
        <div className="no-customer">
          <p>Already have an account?</p>
          <Link to="/login">Login here</Link>
        </div>
      )}

      <h3 className="ls-3 pd-10 uppercase center">Shipping Details</h3>
      <form className={classes.container} autoComplete="off" onSubmit={handleFormSubmit}>
        <TextField
          id="filled-dense"
          label="Name"
          name="name"
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          value={customerDetails.name}
          onChange={handleCustomerDetailsChange}
          fullWidth
          required
        />

        <TextField
          id="filled-dense"
          label="Email"
          name="email"
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          value={customerDetails.email}
          onChange={handleCustomerDetailsChange}
          fullWidth
          required
        />

        <TextField
          id="filled-dense"
          label="Phone"
          name="phone"
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          value={customerDetails.phone}
          onChange={handleCustomerDetailsChange}
          fullWidth
          required
        />

        <TextField
          id="filled-dense"
          label="Country"
          name="country"
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          value={customerDetails.country}
          onChange={handleCustomerDetailsChange}
          fullWidth
          required
        />

        <TextField
          id="filled-dense"
          label="City"
          name="city"
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          value={customerDetails.city}
          onChange={handleCustomerDetailsChange}
          fullWidth
          required
        />

        <TextField
          id="filled-dense"
          label="Address"
          name="address"
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          value={customerDetails.address}
          onChange={handleCustomerDetailsChange}
          fullWidth
          required
        />

        <TextField
          id="filled-dense"
          label="Postal Code"
          name="postalCode"
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          value={customerDetails.postalCode}
          onChange={handleCustomerDetailsChange}
          fullWidth
          required
        />

        <div className="region-select-div">
          <p>Select your region</p>
          <Select
            className="region-select"
            value={selectedRegion}
            onChange={handleRegionSelect}
            options={regions}
            isSearchable={false}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#008cdd',
                primary25: '#dddddd57',
              },
            })}
          />
        </div>

        <div className="region-select-div">
          <p>Select your preferred shipping type</p>
          <Select
            className="region-select"
            value={selectedShippingType}
            onChange={handleShippingType}
            options={shippingTypes}
            isSearchable={false}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#008cdd',
                primary25: '#dddddd57',
              },
            })}
          />
        </div>

        <button type="submit" className="order-button">
          Pay with Stripe
          <i className="fab fa-stripe-s" />
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart,
  // customer: state.auth.customer,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShippingDetailsForm);
