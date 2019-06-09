/**
 * This class contains all request body validations
 * @class
 */
class validate {
  /**
   * Validates the name field
   * @param {Object} request
   * @static
   */
  static name(request) {
    request
      .checkBody('name')
      .exists()
      .withMessage('name field is required')
      .trim()
      .notEmpty()
      .withMessage('name field must not be empty')
      .isLength({ min: 2 })
      .withMessage('name must be longer than 2 characters')
      .matches(/^[A-Za-z ]+$/)
      .withMessage('name must contain only letters and spaces');
  }

  /**
   * Validates the email field
   * @param {Object} request
   * @static
   */
  static email(request) {
    return request
      .checkBody('email')
      .exists()
      .withMessage('email field is required')
      .trim()
      .notEmpty()
      .withMessage('email field must not be empty')
      .isEmail()
      .withMessage('email address is invalid');
  }

  /**
   * Validates the password field
   * @param {Object} request
   * @static
   */
  static password(request) {
    return request
      .checkBody('password')
      .exists()
      .withMessage('password field is required')
      .trim()
      .notEmpty()
      .withMessage('password field must not be empty')
      .isLength({ min: 6 })
      .withMessage('password must be longer than 6 characters')
      .matches(/\d/)
      .withMessage('password must contain a number');
  }

  /**
   * Validates the password field for only login requests
   * @param {Object} request
   * @static
   */
  static loginPassword(request) {
    return request
      .checkBody('password', 'password field must not be empty')
      .trim()
      .notEmpty();
  }

  /**
   * Validates the creditCard field
   * @param {Object} request
   * @static
   */
  static creditCard(request) {
    return request
      .checkBody('creditCard')
      .exists()
      .withMessage('creditCard field is required')
      .trim()
      .notEmpty()
      .withMessage('creditCard field must not be empty')
      .isLength({ min: 12, max: 19 })
      .withMessage('creditCard must be between 12 to 19 digits');
  }

  /**
   * Validates the address fields
   * @param {Object} request
   * @static
   */
  static address(request) {
    request
      .checkBody('address1')
      .exists()
      .withMessage('address1 field is required')
      .trim()
      .notEmpty()
      .withMessage('address1 field must not be empty')
      .isLength({ min: 10 })
      .withMessage('address1 must be more than 10 characters');

    request
      .checkBody('address2')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('address2 field must not be empty')
      .isLength({ min: 5 })
      .withMessage('address2 must be more than 5 characters');

    request
      .checkBody('city')
      .exists()
      .withMessage('city field is required')
      .trim()
      .notEmpty()
      .withMessage('city field must not be empty');

    request
      .checkBody('region')
      .exists()
      .withMessage('region field is required')
      .trim()
      .notEmpty()
      .withMessage('region field must not be empty');

    request
      .checkBody('postalCode')
      .exists()
      .withMessage('postalCode field is required')
      .trim()
      .notEmpty()
      .withMessage('postalCode field must not be empty')
      .isLength({ min: 3 })
      .withMessage('postalCode must be more than 3 characters');

    request
      .checkBody('country')
      .exists()
      .withMessage('country field is required')
      .trim()
      .notEmpty()
      .withMessage('country field must not be empty');

    request
      .checkBody('shippingRegionId')
      .exists()
      .withMessage('shippingRegionId field is required')
      .trim()
      .notEmpty()
      .withMessage('shippingRegionId field must not be empty')
      .isIn([2, 3, 4])
      .withMessage(
        'valid shippingRegionId values are "2 - US/Canada, 3 - Europe, 4 - Rest of the world"',
      );
  }

  /**
   * Validates the customer detail fields
   * @param {Object} request
   * @static
   */
  static customerDetails(request) {
    this.name(request);
    this.email(request);

    request
      .checkBody('password')
      .optional()
      .trim()
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage('password must be longer than 6 characters')
      .matches(/\d/)
      .withMessage('password must contain a number');
  }

  /**
   * validates the review and rating fields
   * @param {Object} request
   * @static
   */
  static review(request) {
    request
      .checkBody('review')
      .exists()
      .withMessage('review field is required')
      .trim()
      .notEmpty()
      .withMessage('review field must not be empty')
      .isLength({ min: 5 })
      .withMessage('review must be more than 5 characters');

    request
      .checkBody('rating')
      .exists()
      .withMessage('rating field is required')
      .trim()
      .notEmpty()
      .withMessage('rating field must not be empty')
      .custom(value => !Number.isNaN(+value))
      .withMessage('rating must be an integer')
      .isIn([1, 2, 3, 4, 5])
      .withMessage('rating must be between a range of 1 - 5');
  }

  /**
   * validates the required fields in the add
   * to cart request
   * @param {Object} request
   * @static
   */
  static addToCart(request) {
    request
      .checkBody('cartId')
      .exists()
      .withMessage('cartId field is required')
      .trim()
      .notEmpty()
      .withMessage('cartId field must not be empty')
      .isLength({ min: 20 })
      .withMessage('cartId must contain at least 20 characters');

    request
      .checkBody('productId')
      .exists()
      .withMessage('productId field is required')
      .trim()
      .notEmpty()
      .withMessage('productId field must not be empty')
      .custom(value => !Number.isNaN(+value))
      .withMessage('productId must be an integer');

    request
      .checkBody('attributes')
      .exists()
      .withMessage('attributes field is required')
      .trim()
      .notEmpty()
      .withMessage('attributes field must not be empty')
      .isLength({ min: 3 })
      .withMessage('attributes field must contain at least 3 characters');
  }

  /**
   * validates the cart Id param
   * @param {Object} request
   * @static
   */
  static cartId(request) {
    request
      .checkParams('id')
      .exists()
      .withMessage('cartId field is required')
      .trim()
      .notEmpty()
      .withMessage('cartId field must not be empty')
      .isLength({ min: 20 })
      .withMessage('cartId must contain at least 20 characters');
  }

  /**
   * validates the quantity param
   * @param {Object} request
   * @static
   */
  static itemUpdate(request) {
    request
      .checkBody('quantity')
      .exists()
      .withMessage('quantity field is required')
      .trim()
      .notEmpty()
      .withMessage('quantity field must not be empty')
      .custom(value => !Number.isNaN(+value))
      .withMessage('quantity must be an integer')
      .isInt({ gt: 0 })
      .withMessage('quantity must be greater than 0');
  }

  /**
   * validates the cart Id body param
   * @param {Object} request
   * @static
   */
  static bodyCartId(request) {
    request
      .checkBody('cartId')
      .exists()
      .withMessage('cartId field is required')
      .trim()
      .notEmpty()
      .withMessage('cartId field must not be empty')
      .isLength({ min: 20 })
      .withMessage('cartId must contain at least 20 characters');
  }

  /**
   * validates the tax ID param
   * @param {Object} request
   * @static
   */
  static taxId(request) {
    request
      .checkBody('taxId')
      .exists()
      .withMessage('taxId field is required')
      .trim()
      .notEmpty()
      .withMessage('taxId field must not be empty')
      .custom(value => !Number.isNaN(+value))
      .withMessage('taxId must be an integer')
      .isInt({ gt: 0 })
      .withMessage('taxId must be greater than 0');
  }

  /**
   * validates the shipping ID param
   * @param {Object} request
   * @static
   */
  static shippingId(request) {
    request
      .checkBody('shippingId')
      .exists()
      .withMessage('shippingId field is required')
      .trim()
      .notEmpty()
      .withMessage('shippingId field must not be empty')
      .custom(value => !Number.isNaN(+value))
      .withMessage('shippingId must be an integer')
      .isInt({ gt: 0 })
      .withMessage('shippingId must be greater than 0');
  }
}

export default validate;
