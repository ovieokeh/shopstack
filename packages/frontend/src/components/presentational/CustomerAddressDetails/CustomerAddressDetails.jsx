import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Spinner from 'react-loader-spinner';
import { updateCustomerRequest } from '../../../actions/profileActions';

const CustomerAddressDetails = props => {
  const { customer, updateDetails, error } = props;

  const regions = [
    { value: 2, label: 'US / Canada' },
    { value: 3, label: 'Europe' },
    { value: 4, label: 'Rest of World' },
  ];
  const defaultRegion = regions.filter(region => region.label === customer.region)[0];

  const [isAddressDetailsDisabled, setisAddressDetailsDisabled] = useState(true);
  const [addressDetails, setAddressDetails] = useState({
    address1: customer.address_1 || '',
    address2: customer.address_2 || '',
    city: customer.city || '',
    region: customer.region || '',
    postalCode: customer.postal_code || '',
    country: customer.country || '',
    shippingRegionId: customer.shipping_region_id || '',
  });
  const [selectedRegion, setSelectedRegion] = useState(defaultRegion);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState('');
  const submitButton = useRef();

  const handleAddressDetailsInput = event =>
    setAddressDetails({ ...addressDetails, [event.target.name]: event.target.value });

  const handleRegionSelect = selectedOption => {
    setAddressDetails({
      ...addressDetails,
      region: selectedOption.label,
      shippingRegionId: selectedOption.value,
    });
    setSelectedRegion(selectedOption);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    if (isAddressDetailsDisabled) {
      setisAddressDetailsDisabled(false);
      setIsActive('is-active');
      return;
    }

    setIsLoading(true);
    submitButton.current.disabled = true;

    const result = await updateDetails({
      ...addressDetails,
      password: addressDetails.password || undefined,
    });

    setIsLoading(false);
    submitButton.current.disabled = false;

    if (result) {
      setisAddressDetailsDisabled(true);
      setIsActive('');
    }
  };

  const renderErrors = field => {
    if (error.hasOwnProperty('data') && error.data[field])
      return <small className="input-error-message">{error.data[field].msg}</small>;

    return null;
  };

  return (
    <div className="address-details">
      <form onSubmit={handleFormSubmit}>
        <div className={`detail-group ${isActive}`}>
          <label htmlFor="name">Address One:</label>
          <input
            disabled={isAddressDetailsDisabled}
            name="address1"
            onChange={handleAddressDetailsInput}
            value={addressDetails.address1}
            type="text"
            required
          />
        </div>
        {error && renderErrors('address1')}

        <div className={`detail-group ${isActive}`}>
          <label htmlFor="address2">Address Two:</label>
          <input
            disabled={isAddressDetailsDisabled}
            name="address2"
            onChange={handleAddressDetailsInput}
            value={addressDetails.address2}
            type="text"
          />
        </div>
        {error && renderErrors('address2')}

        <div className={`detail-group ${isActive}`}>
          <label htmlFor="city">City:</label>
          <input
            disabled={isAddressDetailsDisabled}
            name="city"
            onChange={handleAddressDetailsInput}
            value={addressDetails.city}
            type="text"
            required
          />
        </div>
        {error && renderErrors('city')}

        <div className={`detail-group ${isActive}`}>
          <label htmlFor="region">Region:</label>
          <Select
            className="region-select"
            value={selectedRegion}
            onChange={handleRegionSelect}
            options={regions}
            isDisabled={isAddressDetailsDisabled}
            isSearchable={false}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#5fba7d',
                primary25: '#cacaca',
              },
            })}
          />
        </div>
        {error && renderErrors('region')}

        <div className={`detail-group ${isActive}`}>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            disabled={isAddressDetailsDisabled}
            name="postalCode"
            onChange={handleAddressDetailsInput}
            value={addressDetails.postalCode}
            type="text"
            required
          />
        </div>
        {error && renderErrors('postalCode')}

        <div className={`detail-group ${isActive}`}>
          <label htmlFor="country">Country:</label>
          <input
            disabled={isAddressDetailsDisabled}
            name="country"
            onChange={handleAddressDetailsInput}
            value={addressDetails.country}
            type="text"
          />
        </div>
        {error && renderErrors('country')}

        <div className="btn-container">
          <button ref={submitButton} className="submit-btn" type="submit">
            {isLoading && <Spinner type="Puff" height="15" width="15" color="#000" />}
            {isAddressDetailsDisabled ? <span>Update Address</span> : <span>Save Address</span>}
          </button>
          {!isAddressDetailsDisabled && (
            <button
              className="cancel-btn"
              onClick={() => {
                setisAddressDetailsDisabled(true);
                setIsActive('');
              }}
              type="button"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  customer: state.auth.customer,
  error: state.notification.error,
});

const mapDispatchToProps = dispatch => ({
  updateDetails: details => dispatch(updateCustomerRequest('address', details)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerAddressDetails);
