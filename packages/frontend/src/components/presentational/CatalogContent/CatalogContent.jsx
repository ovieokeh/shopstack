import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { SearchInput } from '..';

const CatalogContent = props => {
  const {
    catalogSidebar,
    catalog,
    handlePageChange,
    clearFilters,
    filterActive,
    activePage,
    productsPerPage,
    searchInputValue,
    onSearchChange,
    onSearchSubmit,
    isSearching,
    stopSearching,
  } = props;

  const filterToggleClassnames = filterActive
    ? 'filters-toggle active-filters-toggle'
    : 'filters-toggle';

  const renderPrice = product =>
    Number(product.discounted_price) ? (
      <p className="product-price">
        ${product.discounted_price} <sup className="discounted">${product.price}</sup>
      </p>
    ) : (
      <p className="product-price">${product.price}</p>
    );

  const renderProducts = () => {
    const { products } = catalog;

    if (!catalog.count)
      return (
        <div className="no-products">
          <p>No products found for those criteria</p>
          <button onClick={() => clearFilters()} type="button">
            Clear filters
          </button>
        </div>
      );

    return products.map(product => (
      <Link to={`/product/${product.product_id}`} className="product" key={product.product_id}>
        <img
          className="product-image"
          alt={product.name}
          src={`https://backendapi.turing.com/images/products/${product.thumbnail}`}
        />
        <div className="product-details">
          <p className="product-name">{product.name}</p>
          {renderPrice(product)}
          <p className="product-description">{product.description}</p>
        </div>
      </Link>
    ));
  };

  return (
    <div className="content">
      <div className="product-filters">
        <button
          id="filters-toggle"
          className={filterToggleClassnames}
          onClick={() => {
            catalogSidebar.current.classList.toggle('show-catalog-sidebar');
          }}
          type="button"
        >
          Filters
        </button>

        <SearchInput
          placeholder="Search for a product"
          value={searchInputValue}
          onChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
        />
        {isSearching && (
          <span className="clear-search" onClick={stopSearching}>
            reset
          </span>
        )}
      </div>
      <div className="products">{renderProducts()}</div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={productsPerPage}
        totalItemsCount={catalog.totalCount}
        onChange={handlePageChange}
        hideDisabled={true}
        hideNavigation={true}
        innerClass="pagination-row"
        activeLinkClass="active"
      />
    </div>
  );
};

export default CatalogContent;
