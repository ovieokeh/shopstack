import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import ImageGallery from 'react-image-gallery';
import { ArrowBackIos } from '@material-ui/icons';
import {
  QuantityUpdater,
  ProductAttributePicker,
  OtherProducts,
  ProductReviews,
  AlertDialog,
} from '../../presentational';
import { getProductRequest } from '../../../actions/productActions';
import { addToCartAction } from '../../../actions/cartActions';
import './SingleProduct.scss';

class SingleProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      quantity: 1,
      size: { value: 'S', label: 'S' },
      color: { value: 'White', label: 'White' },
      ratings: 0,
      showDialog: false,
      reviews: [],
    };
  }

  async componentDidMount() {
    const { getProduct } = this.props;
    await getProduct(this.props.match.params.id);
  }

  async componentDidUpdate(prevProps, prevState) {
    prevState.id !== this.state.id && (await prevProps.getProduct(this.state.id));
    prevState.reviews !== this.state.reviews && this.updateRatings();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextId = nextProps.match.params.id;

    if (nextId !== prevState.id || nextProps.reviews !== prevState.reviews) {
      return {
        id: nextId,
        reviews: nextProps.reviews,
        quantity: 1,
        size: { value: 'S', label: 'S' },
        color: { value: 'White', label: 'White' },
      };
    }

    return null;
  }

  updateQuantity = event => {
    const { quantity } = this.state;
    const type = event.target.name;

    if (quantity === 1 && type === 'minus') return;

    if (type === 'minus') {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }));
    } else {
      this.setState(prevState => ({
        quantity: prevState.quantity + 1,
      }));
    }
  };

  updateRatings = () => {
    const { reviews } = this.state;
    const newRatings = reviews.length
      ? reviews.map(review => review.rating).reduce((prev, cur) => prev + cur) / reviews.length
      : 0;

    this.setState({ ratings: newRatings });
  };

  handleAttributeSelect = selectedOption => {
    const sizeAttributes = ['S', 'M', 'L', 'XL', 'XXL'];

    if (sizeAttributes.includes(selectedOption.label)) {
      this.setState({
        size: selectedOption,
      });
    } else {
      this.setState({
        color: selectedOption,
      });
    }
  };

  handleAddToCart = product => () => {
    const { product_id: productId } = product;
    const { quantity, size, color } = this.state;

    const details = {
      name: product.name,
      image: `https://backendapi.turing.com/images/products/${product.image}`,
      quantity: quantity,
      attributes: [size.value, color.value],
      price: Number(product.discounted_price) || product.price,
    };

    this.props.addToCart(productId, details);
    this.setState({
      showDialog: true,
    });
  };

  toggleDialog = () => {
    this.setState(prevState => ({
      showDialog: !prevState.showDialog,
    }));
  };

  renderPrice = product =>
    Number(product.discounted_price) ? (
      <p className="product-price">
        ${product.discounted_price} <sup className="discounted">${product.price}</sup>
      </p>
    ) : (
      <p className="product-price">${product.price}</p>
    );

  renderProduct = () => {
    const { quantity, size, color, ratings, showDialog } = this.state;
    const { product } = this.props;

    if (!product) return <div />;

    const images = [
      {
        original: `https://backendapi.turing.com/images/products/${product.image}`,
        thumbnail: `https://backendapi.turing.com/images/products/${product.image}`,
      },
      {
        original: `https://backendapi.turing.com/images/products/${product.image_2}`,
        thumbnail: `https://backendapi.turing.com/images/products/${product.image_2}`,
      },
    ];

    return (
      <div key={product.product_id} className="product">
        {showDialog && (
          <AlertDialog
            title="Success"
            content="Product added to cart successfully"
            open={showDialog}
            setOpen={this.toggleDialog}
          />
        )}
        <div className="product-image-container">
          <Link className="back-to-shop" to="/shop">
            <ArrowBackIos />
            <span>Back to shop</span>
          </Link>

          <ImageGallery
            items={images}
            showNav={false}
            showFullscreenButton={false}
            showPlayButton={false}
          />
        </div>
        <div className="product-details">
          <h2>{product.name}</h2>
          {this.renderPrice(product)}
          <Rating
            emptySymbol="far fa-star"
            fullSymbol="fas fa-star"
            initialRating={ratings}
            readonly
          />
          <QuantityUpdater quantity={quantity} updateQuantity={this.updateQuantity} />
          <ProductAttributePicker
            handleAttributeSelect={this.handleAttributeSelect}
            attributes={product.attributes}
            selectedAttributes={[size, color]}
          />
          <button
            onClick={this.handleAddToCart(product)}
            className="add-to-cart-btn"
            id="add-to-cart-btn"
            type="button"
          >
            Add to cart
          </button>
          <p className="product-description">{product.description}</p>
        </div>
      </div>
    );
  };

  render() {
    window.document.title = this.props.product
      ? this.props.product.name + ' | Shop Stack'
      : 'Product | Shop Stack';

    return (
      <div className="product-container">
        {this.renderProduct()}

        {!this.props.isLoading && (
          <div>
            <ProductReviews reviews={this.state.reviews} />
            <OtherProducts />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.selectedProduct.product,
  reviews: state.selectedProduct.reviews,
  isLoading: state.loader.isLoading,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(getProductRequest(id)),
  addToCart: (productId, details) => dispatch(addToCartAction(productId, details)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleProduct);
