import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerRequest } from '../../../actions/authActions';
import './Register.scss';

const Register = props => {
  window.document.title = 'Create an account | Shop Stack';

  const { register, error, loading, token, history } = props;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const submitButton = useRef();

  useEffect(() => {
    token && history.push('/');
  }, [token, history]);

  const handleInputChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleFormSubmit = async event => {
    event.preventDefault();
    submitButton.current.disabled = true;

    const customerDetails = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
    };

    await register(customerDetails);
    localStorage.setItem('remember', true);

    if (!loading) {
      submitButton.current.disabled = false;
    }
  };

  const renderErrors = field => {
    if (error.message === 'this email address is already in use' && field === 'email')
      return <span className="input-error-message">{error.message}</span>;

    if (error.hasOwnProperty('data') && error.data[field])
      return <span className="input-error-message">{error.data[field].msg}</span>;

    return null;
  };

  const addErrorClassname = field => {
    if (error.message === 'this email address is already in use' && field === 'email')
      return 'input-error';

    if (error && error.data && error.data[field]) return 'input-error';

    return '';
  };

  return (
    <div className="register-container">
      <h2 className="ls-3 pd-10 uppercase center">Create an Account</h2>
      <hr />

      <form className="form" onSubmit={handleFormSubmit}>
        <div className="input-row">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            className={addErrorClassname('firstName')}
            value={formData.firstName}
            onChange={e => handleInputChange(e)}
            autoFocus
            required
          />
          {error && renderErrors('firstName')}
        </div>

        <div className="input-row">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            className={addErrorClassname('lastName')}
            value={formData.lastName}
            onChange={e => handleInputChange(e)}
            required
          />
          {error && renderErrors('lastName')}
        </div>

        <div className="input-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className={addErrorClassname('email')}
            value={formData.email}
            onChange={e => handleInputChange(e)}
            required
          />
          {error && renderErrors('email')}
        </div>

        <div className="input-row">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className={addErrorClassname('password')}
            value={formData.password}
            onChange={e => handleInputChange(e)}
            pattern="^(?=.*\d).{6,16}$"
            required
          />
          {error && renderErrors('password')}
          <small>must contain at least one number and must be at least 6 characters long</small>
        </div>

        <small>
          *By signing up, you agree to our <Link to="/terms-of-service">terms of service</Link>
        </small>

        <button ref={submitButton} type="submit">
          Create Account
        </button>

        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  error: state.notification.error,
  token: state.auth.accessToken,
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  register: customerDetails => dispatch(registerRequest(customerDetails)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
