import React from 'react';
import Rating from 'react-rating';
import './ProductReviews.scss';

const ProductReviews = ({ reviews }) => {
  if (!reviews.length)
    return (
      <div className="no-reviews-container">
        <p>No reviews yet</p>
      </div>
    );

  const renderReviews = () =>
    reviews.map(review => (
      <div key={review.name + review.createdOn} className="product-review">
        <small className="review-date">{`${new Date(review.createdOn).toDateString()}`}</small>
        <p className="reviewer">{review.name}</p>
        <Rating
          emptySymbol="far fa-star"
          fullSymbol="fas fa-star"
          initialRating={review.rating}
          readonly
        />
        <p className="review">{review.review}</p>
      </div>
    ));

  return (
    <div>
      <h3 className="ls-3 pd-10 uppercase center">{`Reviews (${reviews.length})`}</h3>
      {renderReviews()}
    </div>
  );
};

export default ProductReviews;
