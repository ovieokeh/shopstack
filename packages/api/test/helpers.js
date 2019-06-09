import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

/* istanbul ignore file */

chai.use(chaiHttp);

/**
 * @description Creates a new customer
 *
 * @param {object} customer the details of the new customer
 * @returns {string} the auth token of the new customer
 */
const addCustomer = async customer => {
  let customerToken;

  await chai
    .request(app)
    .post('/api/customers')
    .send(customer)
    .then(res => {
      customerToken = res.body.data.accessToken;
    });

  return customerToken;
};

/**
 * @description Adds a product to the cart
 *
 * @param {object} product the details of the product
 * @returns {string} the item ID of the product in the cart
 */
const addToCart = async product => {
  let id;

  await chai
    .request(app)
    .post('/api/shoppingcart/add')
    .send(product)
    .then(res => {
      id = res.body.data[0].item_id;
    });

  return id;
};

export { addCustomer, addToCart };
