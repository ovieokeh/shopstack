import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import app from '../src/index';
import { addToCart, addCustomer } from './helpers';

chai.use(chaiHttp);

describe('Order', () => {
  const cartId = 'n1A1kTKueek9KS2qHJw3c';
  let customerToken;
  let orderId;

  before(async () => {
    await addToCart({
      cartId,
      productId: 5,
      attributes: 'good, works',
    });

    customerToken = await addCustomer({
      name: 'Dummy Customer',
      email: 'dummycustomer@example.com',
      password: 'password1',
    });
  });

  describe('Add new order - POST /orders', () => {
    describe('Validations', () => {
      it('should handle missing fields', done => {
        chai
          .request(app)
          .post('/api/orders')
          .set('user-key', customerToken)
          .send()
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.cartId.msg).to.be('cartId field is required');
            expect(res.body.data.shippingId.msg).to.be('shippingId field is required');
            expect(res.body.data.taxId.msg).to.be('taxId field is required');
            done();
          });
      });
    });

    it('should post an order successfully', done => {
      chai
        .request(app)
        .post('/api/orders')
        .set('user-key', customerToken)
        .send({
          cartId,
          shippingId: 2,
          taxId: 1,
        })
        .end((_, res) => {
          expect(res.status).to.be(201);
          expect(res.body.message).to.be('order posted successfully');
          expect(res.body.data).to.be(1);
          orderId = res.body.data;
          done();
        });
    });

    it('should handle a nonexistent cart', done => {
      chai
        .request(app)
        .post('/api/orders')
        .set('user-key', customerToken)
        .send({
          cartId,
          shippingId: 2,
          taxId: 1,
        })
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('cart not found');
          done();
        });
    });
  });

  describe('Get order details - GET /orders/:id', () => {
    describe('Validations', () => {
      it('should handle invalid order IDs', done => {
        chai
          .request(app)
          .get('/api/orders/err')
          .set('user-key', customerToken)
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('order ID must be a number');
            done();
          });
      });
    });

    it("should get an order's details successfully", done => {
      chai
        .request(app)
        .get(`/api/orders/shortDetail/${orderId}`)
        .set('user-key', customerToken)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('order details retrieved successfully');
          expect(res.body.data).to.be.an('object');
          done();
        });
    });

    it("should get an order's info successfully", done => {
      chai
        .request(app)
        .get(`/api/orders/${orderId}`)
        .set('user-key', customerToken)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('order info retrieved successfully');
          expect(res.body.data).to.be.an('object');
          done();
        });
    });

    it('should handle nonexistent orders', done => {
      chai
        .request(app)
        .get('/api/orders/100')
        .set('user-key', customerToken)
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('order not found');
          done();
        });
    });
  });

  describe('Get customer orders - GET /orders/inCustomer', () => {
    describe('Validations', () => {
      it('should handle unauthorized requests', done => {
        chai
          .request(app)
          .get('/api/orders/inCustomer')
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('no token provided');
            done();
          });
      });
    });

    it("should should get a customer's orders successfully", done => {
      chai
        .request(app)
        .get('/api/orders/inCustomer')
        .set('user-key', customerToken)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('customer orders retrieved successfully');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });
});
