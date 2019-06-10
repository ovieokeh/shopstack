import React from 'react';
import { Link } from 'react-router-dom';
import './ProductItem.scss';

const ProductItem = props => {
  const {
    product: { name, description, discounted_price, price, thumbnail, product_id: productId },
  } = props;

  return (
    <Link to={`/product/${productId}`} className="product-item">
      <img alt={name} src={`https://backendapi.turing.com/images/products/${thumbnail}`} />
      <p>{description}</p>
      {Number(discounted_price) ? (
        <p className="product-price">
          ${discounted_price} <sup className="discounted">${price}</sup>
        </p>
      ) : (
        <p className="product-price">${price}</p>
      )}
    </Link>
  );
};

export default ProductItem;
