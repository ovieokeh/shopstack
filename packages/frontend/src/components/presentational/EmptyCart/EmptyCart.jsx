import React from 'react';
import { Link } from 'react-router-dom';
import { Error } from '@material-ui/icons';
import './EmptyCart.scss';

const EmptyCart = ({ onClick }) => (
  <div className="no-items">
    <Error />
    <p>There are no items in your cart</p>
    <Link onClick={onClick} className="start-shopping" to="/shop">
      Start shopping
    </Link>
  </div>
);

export default EmptyCart;
