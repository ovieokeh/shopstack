import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginRequest } from '../../../actions/authActions';
import './Login.scss';

const Login = props => {
  window.document.title = 'Login | Shop Stack';

  const { login, error, loading, token, history } = props;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const submitButton = useRef();

  useEffect(() => {
    token && history.push('/');
  }, [token, history]);

  const handleInputChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleFormSubmit = async event => {
    event.preventDefault();
    submitButton.current.disabled = true;
    const customerDetails = { ...formData };

    if (rememberMe) {
      localStorage.setItem('remember', true);
    }
    await login(customerDetails);

    if (!loading) {
      submitButton.current.disabled = false;
    }
  };

  const renderErrors = () => {
    return error.hasOwnProperty('message') ? (
      <span className="input-error-message">{error.message}</span>
    ) : null;
  };

  const addErrorClassname = () => {
    return error && error.hasOwnProperty('message') ? 'input-error' : '';
  };

  return (
    <div className="login-container">
      <h2 className="ls-3 pd-10 uppercase center">Log into your account</h2>
      <hr />

      <form className="form" onSubmit={handleFormSubmit}>
        <div className="input-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className={addErrorClassname()}
            value={formData.email}
            onChange={e => handleInputChange(e)}
            autoFocus
            required
          />
          {error && renderErrors()}
        </div>

        <div className="input-row">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className={addErrorClassname()}
            value={formData.password}
            onChange={e => handleInputChange(e)}
            required
          />
          {error && renderErrors()}
        </div>

        <div onClick={() => setRememberMe(!rememberMe)} className="remember-container">
          <input
            type="checkbox"
            value={rememberMe}
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <span>Remember me</span>
        </div>

        <small>
          Don't have an account? <Link to="/register">Create one here</Link>
        </small>

        <button ref={submitButton} type="submit">
          Login
        </button>
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
  login: customerDetails => dispatch(loginRequest(customerDetails)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
