import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-loader-spinner';
import { updateCustomerRequest } from '../../../actions/profileActions';

const PrimaryCustomerDetails = props => {
  const { customer, updatePrimaryDetails, error } = props;

  const [isPrimaryDetailsDisabled, setIsPrimaryDetailsDisabled] = useState(true);
  const [primaryDetails, setPrimaryDetails] = useState({
    name: customer.name,
    email: customer.email,
    password: '',
    dayPhone: customer.day_phone || '',
    evePhone: customer.eve_phone || '',
    mobPhone: customer.mob_phone || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState('');
  const submitButton = useRef();

  const handlePrimaryDetailsInput = event =>
    setPrimaryDetails({ ...primaryDetails, [event.target.name]: event.target.value });

  const handleFormSubmit = async e => {
    e.preventDefault();

    if (isPrimaryDetailsDisabled) {
      setIsPrimaryDetailsDisabled(false);
      setIsActive('is-active');
      return;
    }

    setIsLoading(true);
    submitButton.current.disabled = true;

    const result = await updatePrimaryDetails({
      ...primaryDetails,
      password: primaryDetails.password || undefined,
    });

    setIsLoading(false);
    submitButton.current.disabled = false;

    if (result) {
      setIsPrimaryDetailsDisabled(true);
      setIsActive('');
    }
  };

  const renderErrors = field => {
    if (error.hasOwnProperty('data') && error.data[field])
      return <small className="input-error-message">{error.data[field].msg}</small>;

    return null;
  };

  return (
    <div className="primary-details">
      <form onSubmit={handleFormSubmit}>
        <div className={`detail-group ${isActive}`}>
          <label htmlFor="name">Name:</label>
          <input
            disabled={isPrimaryDetailsDisabled}
            name="name"
            onChange={handlePrimaryDetailsInput}
            value={primaryDetails.name}
            type="text"
            required
          />
        </div>
        {error && renderErrors('name')}

        <div className={`detail-group ${isActive}`}>
          <label htmlFor="email">Email:</label>
          <input
            disabled={isPrimaryDetailsDisabled}
            name="email"
            onChange={handlePrimaryDetailsInput}
            value={primaryDetails.email}
            type="email"
            required
          />
        </div>
        {error && renderErrors('email')}

        <div className={`detail-group ${isActive}`}>
          <label htmlFor="password">Password:</label>
          <input
            disabled={isPrimaryDetailsDisabled}
            name="password"
            onChange={handlePrimaryDetailsInput}
            value={primaryDetails.password}
            type="password"
            autoComplete="new-password"
            placeholder="**********"
          />
        </div>
        {error && renderErrors('password')}

        <div className={`detail-group ${isActive}`}>
          <label htmlFor="dayPhone">Primary Phone:</label>
          <input
            disabled={isPrimaryDetailsDisabled}
            name="dayPhone"
            onChange={handlePrimaryDetailsInput}
            value={primaryDetails.dayPhone}
            type="text"
          />
        </div>

        <div className={`detail-group ${isActive}`}>
          <label htmlFor="evePhone">Secondary Phone:</label>
          <input
            disabled={isPrimaryDetailsDisabled}
            name="evePhone"
            onChange={handlePrimaryDetailsInput}
            value={primaryDetails.evePhone}
            type="text"
          />
        </div>

        <div className={`detail-group ${isActive}`}>
          <label htmlFor="mobPhone">Mobile Phone:</label>
          <input
            disabled={isPrimaryDetailsDisabled}
            name="mobPhone"
            onChange={handlePrimaryDetailsInput}
            value={primaryDetails.mobPhone}
            type="text"
          />
        </div>

        <div className="btn-container">
          <button ref={submitButton} className="submit-btn" type="submit">
            {isLoading && <Spinner type="Puff" height="15" width="15" color="#000" />}
            {isPrimaryDetailsDisabled ? <span>Update Details</span> : <span>Save Details</span>}
          </button>
          {!isPrimaryDetailsDisabled && (
            <button
              className="cancel-btn"
              onClick={() => {
                setIsPrimaryDetailsDisabled(true);
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
  updatePrimaryDetails: details => dispatch(updateCustomerRequest('primary', details)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrimaryCustomerDetails);
