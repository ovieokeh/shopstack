import React from 'react';

const PaginationArrows = ({ page, handlePageChange }) => (
  <div className="product-page-filter">
    <button name="prev" className="arrows" onClick={handlePageChange}>
      Prev Page
    </button>
    <small>Page {page}</small>
    <button name="next" className="arrows" onClick={handlePageChange}>
      Next Page
    </button>
  </div>
);

export default PaginationArrows;
