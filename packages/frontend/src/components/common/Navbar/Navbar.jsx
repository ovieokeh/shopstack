import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, Person, ToggleOff } from '@material-ui/icons';
import { logoutRequest } from '../../../actions/authActions';
import { AlertDialog } from '../../presentational';
import { Cart } from '../../container';
import './Navbar.scss';

const Navbar = props => {
  window.document.title = 'E-Commerce for everyone | Shop Stack';
  const { token, logout, cart } = props;

  const [isCartOpen, setIsCartOpen] = useState(false);

  const menu = useRef();
  const logoutButton = useRef();
  const profileContainer = useRef();

  useEffect(() => {
    const params = {
      allowedTargets: [
        'profileContainerToggler',
        'hamburger',
        'nav-right',
        'nav-content',
        'nav-search',
      ],
      targets: [profileContainer.current, menu.current],
      classNames: ['show-nav-profile-container', 'nav-right__show'],
    };

    window.document.addEventListener('click', removeClassName(params));

    return () => {
      window.document.removeEventListener('click', removeClassName(params));
    };
  }, []);

  const removeClassName = params => event => {
    const element = event.target;
    const { allowedTargets, targets, classNames } = params;

    if (!allowedTargets.includes(element.id)) {
      targets[0] && targets[0].classList.remove(classNames[0]);
      targets[1].classList.remove(classNames[1]);
    }
  };

  const toggleRefClass = (ref, className) => () => {
    ref.current.classList.toggle(className);
  };

  const toggleCartDetails = () => setIsCartOpen(!isCartOpen);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const renderAuthLinks = () => {
    return token ? (
      <React.Fragment>
        <button
          id="profileContainerToggler"
          onClick={toggleRefClass(profileContainer, 'show-nav-profile-container')}
          className="nav-item nav-avatar"
          type="button"
        >
          <span className="label">Your profile</span>
          <Person className="nav-item-icon" />
        </button>

        <div ref={profileContainer} className="nav-profile-container">
          <NavLink
            id="profileLink"
            onClick={toggleRefClass(profileContainer, 'show-nav-profile-container')}
            className="nav-profile-item"
            to="/customer"
          >
            <span className="label">Profile</span>
            <Person className="nav-item-icon" />
          </NavLink>
          <button
            id="logoutButton"
            onClick={handleLogout}
            ref={logoutButton}
            className="nav-item nav-profile-item logout"
          >
            <span className="label">Logout</span>
            <ToggleOff className="nav-item-icon" />
          </button>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link" to="/register">
          Create account
        </NavLink>
      </React.Fragment>
    );
  };

  const renderCartDetails = () => {
    return (
      <AlertDialog
        title="Your cart"
        content={<Cart toggleCart={toggleCartDetails} />}
        fullWidth={true}
        maxWidth="md"
        open={isCartOpen}
        setOpen={toggleCartDetails}
        okButtonText="Keep shopping"
      />
    );
  };

  return (
    <div className="navbar">
      <NavLink className="nav-brand" to="/">
        SHOPSTACK
      </NavLink>

      <div className="i-flex">
        <div id="nav-right" className="nav-right" ref={menu}>
          <div id="nav-content" className="nav-links nav-content">
            {renderAuthLinks()}
          </div>
        </div>
        <div>
          <div onClick={toggleCartDetails} className="nav-cart">
            <ShoppingCart />
            <span>{`${cart.count} Cart $${cart.totalPrice} USD`}</span>
          </div>
          {renderCartDetails()}
          <Menu
            id="hamburger"
            className="hamburger"
            onClick={toggleRefClass(menu, 'nav-right__show')}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.auth.accessToken,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);
