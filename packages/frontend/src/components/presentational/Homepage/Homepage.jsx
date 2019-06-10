import React from 'react';
import { Link } from 'react-router-dom';
import { ProductItem } from '..';
import './Homepage.scss';

const products = [
  {
    productId: 1,
    name: 'plaid',
    description: 'Soft-Wash Tall Button Up Shirt in Bonfire Red Plaid',
    thumbnail: 'alsace-2.gif',
    price: '49.99',
  },
  {
    productId: 2,
    name: 'plaid2',
    description: 'Soft-Wash Tall Button Up Shirt in Seaport Blue Plaid',
    thumbnail: 'alsace.gif',
    price: '49.99',
  },
  {
    productId: 3,
    name: 'dress',
    description: 'Untucked Washed Oxford Tall Dress Shirt in Grey',
    thumbnail: 'marianne.gif',
    price: '39.99',
  },
  {
    productId: 4,
    name: 'dress2',
    description: 'Untucked Washed Oxford Tall Dress Shirt in Blue',
    thumbnail: 'gallic-cock.gif',
    price: '39.99',
  },
];

const Homepage = () => {
  window.document.title = 'Shopping made easy | Shop Stack';

  return (
    <div className="homepage-container">
      <div className="hero">
        <h2>Welcome to Shop Stack</h2>
        <p>
          The Lorem Ipsum Store is a quirky little boutique with a giant heart nestled away in sunny
          Singapore.
        </p>
        <Link to="/shop" className="cta-btn">
          Shop Now
        </Link>
      </div>

      <h3 className="ls-3 pd-10 uppercase center">Shop for the holiday seasons</h3>

      <div className="ctas">
        <div className="christmas-cta cta-div">
          <p className="cta-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <Link to="/shop" className="cta-btn">
            Shop Now
          </Link>
        </div>
        <div className="valentine-cta cta-div">
          <p className="cta-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <Link to="/shop" className="cta-btn">
            Shop Now
          </Link>
        </div>
      </div>

      <h3 className="ls-3 pd-10 uppercase center">Latest Arrivals</h3>

      <div className="latest-arrivals">
        {products.map(product => (
          <ProductItem key={product.productId} product={product} />
        ))}
      </div>

      <div className="subscribe-container">
        <div className="subscribe-text">
          <p>
            Subscribe to our Newsletter to get access to our promotions, discounts, and new products
            before anyone else.
            <span className="small">*we promise not to spam</span>
          </p>
        </div>
        <div className="subscribe-input-container">
          <input type="text" placeholder="Your e-mail here" />
          <button type="button">Subscribe</button>
        </div>
      </div>

      <div className="shop-cta">
        <span>Browse our whole collection</span>
        <Link to="/shop" className="cta-btn dark-btn">
          Shop Now
        </Link>
      </div>

      <h3 className="ls-3 pd-10 uppercase center">Show off your national pride</h3>

      <div className="ctas">
        <div className="france-cta cta-div">
          <p className="cta-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <Link to="/shop" className="cta-btn">
            Shop Now
          </Link>
        </div>
        <div className="italy-cta cta-div">
          <p className="cta-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <Link to="/shop" className="cta-btn">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
