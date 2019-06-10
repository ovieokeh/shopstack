import React from 'react';
import './QuantityUpdater.scss';

const QuantityUpdater = ({ quantity, updateQuantity }) => (
  <div className="quantity-container">
    <button name="minus" onClick={updateQuantity} type="button">
      -
    </button>
    <span>{quantity}</span>
    <button name="plus" onClick={updateQuantity} type="button">
      +
    </button>
  </div>
);

export default QuantityUpdater;
