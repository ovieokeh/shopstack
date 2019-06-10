import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-loader-spinner';
import { updateCustomerRequest } from '../../../actions/profileActions';

const CustomerCreditCardDetails = props => {
  const { customer, updateDetails, error } = props;

  const [isDisabled, setisDisabled] = useState(true);
  const [creditCard, setCreditCard] = useState(customer.creditCard);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState('');
  const submitButton = useRef();

  const handleFormSubmit = async e => {
    e.preventDefault();

    if (isDisabled) {
      setisDisabled(false);
      setIsActive('is-active');
      return;
    }

    setIsLoading(true);
    submitButton.current.disabled = true;

    const result = await updateDetails({ creditCard });

    setIsLoading(false);
    submitButton.current.disabled = false;

    if (result) {
      setisDisabled(true);
      setIsActive('');
    }
  };

  const renderErrors = field => {
    if (error.hasOwnProperty('data') && error.data[field])
      return <small className="input-error-message">{error.data[field].msg}</small>;

    return null;
  };

  return (
    <div className="credit-card-details">
      <form onSubmit={handleFormSubmit}>
        <div className={`detail-group ${isActive}`}>
          <label htmlFor="name">Credit Card Number:</label>
          <input
            className="secure-input"
            disabled={isDisabled}
            name="creditCard"
            onChange={e => setCreditCard(e.target.value)}
            value={creditCard}
            type="number"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            required
          />
        </div>
        {error && renderErrors('creditCard')}

        <div className="btn-container">
          <button ref={submitButton} className="submit-btn" type="submit">
            {isLoading && <Spinner type="Puff" height="15" width="15" color="#000" />}
            {isDisabled ? <span>Update</span> : <span>Save</span>}
          </button>
          {!isDisabled && (
            <button
              className="cancel-btn"
              onClick={() => {
                setisDisabled(true);
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
  updateDetails: details => dispatch(updateCustomerRequest('credit', details)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerCreditCardDetails);
