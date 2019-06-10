import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ProductItem } from '..';
import { getProductsRequest } from '../../../actions/shopActions';
import './OtherProducts.scss';

const OtherProducts = props => {
  const { products, getProducts } = props;

  const params = {
    page: 1,
    limit: 20,
    filter: null,
  };

  useEffect(() => {
    (!products || (products && !products.length)) && getProducts(params);
  }, [getProducts, products, params]);

  if (!products) return <div />;

  return (
    <div className="other-products-container">
      <h3 className="ls-3 uppercase center">Shop Similar Items</h3>
      <div className="other-products">
        {products.map((product, index) =>
          index < 4 ? <ProductItem key={product.product_id} product={product} /> : null,
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.shop.catalog.products,
});

const mapDispatchToProps = dispatch => ({
  getProducts: params => dispatch(getProductsRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OtherProducts);
