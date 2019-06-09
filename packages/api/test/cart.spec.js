import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import app from '../src/index';
import { addToCart } from './helpers';

chai.use(chaiHttp);

describe('Shopping Cart', () => {
  let itemId;

  describe('Get unique ID - GET /shoppingcart/generateUniqueId', () => {
    it('should get a unique ID', done => {
      chai
        .request(app)
        .get('/api/shoppingcart/generateUniqueId')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.data).to.be.a('string');
          expect(res.body.data.length).to.be.greaterThan(20);
          done();
        });
    });
  });

  describe('Post to cart - POST /shoppingcart/add', () => {
    describe('Validations', () => {
      it('should handle missing required fields', done => {
        chai
          .request(app)
          .post('/api/shoppingcart/add')
          .send({})
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.cartId.msg).to.be('cartId field is required');
            expect(res.body.data.productId.msg).to.be('productId field is required');
            expect(res.body.data.attributes.msg).to.be('attributes field is required');
            done();
          });
      });

      it('should handle invalid cart IDs', done => {
        chai
          .request(app)
          .post('/api/shoppingcart/add')
          .send({
            cartId: '1',
            productId: 1,
            attributes: 'wrong, error',
          })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.cartId.msg).to.be('cartId must contain at least 20 characters');
            done();
          });
      });
    });

    it('should add a product to cart successfully', done => {
      chai
        .request(app)
        .post('/api/shoppingcart/add')
        .send({
          cartId: 'n1A1kTKueek9KS2qHJw3c',
          productId: 1,
          attributes: 'good, works',
        })
        .end((_, res) => {
          expect(res.status).to.be(201);
          expect(res.body.message).to.be('product added to cart successfully');
          expect(res.body.data[0].name).to.be("Arc d'Triomphe");
          done();
        });
    });

    it('should handle nonexistent products', done => {
      chai
        .request(app)
        .post('/api/shoppingcart/add')
        .send({
          cartId: 'n1A1kTKueek9KS2qHJw3c',
          productId: 1000,
          attributes: 'good, works',
        })
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('product not found');
          done();
        });
    });
  });

  describe('Get total amount - GET /shoppingcart/totalAmount/:id', () => {
    describe('Validations', () => {
      it('should handle invalid cart IDs', done => {
        chai
          .request(app)
          .get('/api/shoppingcart/totalAmount/err')
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.id.msg).to.be('cartId must contain at least 20 characters');
            done();
          });
      });
    });

    it('should get the total amount successfully', done => {
      chai
        .request(app)
        .get('/api/shoppingcart/totalAmount/n1A1kTKueek9KS2qHJw3c')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('total amount retrieved successfully');
          expect(res.body.data.totalAmount).to.be('14.99');
          done();
        });
    });

    it('should handle nonexistent carts', done => {
      chai
        .request(app)
        .get('/api/shoppingcart/totalAmount/n1A1kTKueek9KS2qHJw3a')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('cart not found');
          done();
        });
    });
  });

  describe('Get products - GET /shoppingcart/:id', () => {
    describe('Validations', () => {
      it('should handle invalid cart IDs', done => {
        chai
          .request(app)
          .get('/api/shoppingcart/err')
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.id.msg).to.be('cartId must contain at least 20 characters');
            done();
          });
      });
    });

    it('should get all the products in a cart', done => {
      chai
        .request(app)
        .get('/api/shoppingcart/n1A1kTKueek9KS2qHJw3c')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('products retrieved successfully');
          expect(res.body.data.length).to.be(1);
          done();
        });
    });

    it('should handle nonexistent carts', done => {
      chai
        .request(app)
        .get('/api/shoppingcart/n1A1kTKueek9KS2qHJw3a')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('cart not found');
          done();
        });
    });
  });

  describe('Update item quantity - PUT /shoppingcart/:id', () => {
    describe('Validations', () => {
      it('should handle invalid item IDs', done => {
        chai
          .request(app)
          .put('/api/shoppingcart/err')
          .send({ quantity: 100 })
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('item ID must be a number');
            done();
          });
      });

      it('should handle invalid quantity values', done => {
        chai
          .request(app)
          .put('/api/shoppingcart/1')
          .send({ quantity: -100 })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.quantity.msg).to.be('quantity must be greater than 0');
            done();
          });
      });
    });

    it('should update the quantity successfully', done => {
      chai
        .request(app)
        .put('/api/shoppingcart/1')
        .send({ quantity: 100 })
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('item quantity updated successfully');
          expect(res.body.data.length).to.be(1);
          done();
        });
    });

    it('should handle nonexistent item IDs', done => {
      chai
        .request(app)
        .put('/api/shoppingcart/100000')
        .send({ quantity: 100 })
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('item not found');
          done();
        });
    });
  });

  describe('Clear cart - DELETE /shoppingcart/:id', () => {
    it('should clear a cart successfully', done => {
      chai
        .request(app)
        .delete('/api/shoppingcart/n1A1kTKueek9KS2qHJw3c')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('cart cleared successfully');
          expect(res.body.data.length).to.be(0);
          done();
        });
    });

    it('should handle nonexistent carts', done => {
      chai
        .request(app)
        .delete('/api/shoppingcart/n1A1kTKueek9KS2qHJw3c')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('cart not found');
          done();
        });
    });
  });

  describe('Save for later - GET /shoppingcart/saveForLater/:id', () => {
    before(async () => {
      const dummyProduct = {
        cartId: 'cYbN5DnjtyxVijKDye43tC',
        productId: 1,
        attributes: 'good, works',
      };

      itemId = await addToCart(dummyProduct);
    });
    describe('Validations', () => {
      it('should handle invalid item IDs', done => {
        chai
          .request(app)
          .get('/api/shoppingcart/saveForLater/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('item ID must be a number');
            done();
          });
      });
    });

    it('should save an item for later successfully', done => {
      chai
        .request(app)
        .get(`/api/shoppingcart/saveForLater/${itemId}`)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('item saved for later successfully');
          done();
        });
    });

    it('should handle nonexistent items', done => {
      chai
        .request(app)
        .get('/api/shoppingcart/saveForLater/100')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('item not found');
          done();
        });
    });
  });

  describe('Get saved - GET /shoppingcart/getSaved/:id', () => {
    it('retrieves saved items successfully', done => {
      chai
        .request(app)
        .get('/api/shoppingcart/getSaved/cYbN5DnjtyxVijKDye43tC')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('items retrieved successfully');
          expect(res.body.data.length).to.be(1);
          done();
        });
    });

    it('handles nonexistent saved items', done => {
      chai
        .request(app)
        .get('/api/shoppingcart/getSaved/n1A1kTKueek9KS2qHJw3c')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be(
            'no saved items found for cart with ID n1A1kTKueek9KS2qHJw3c',
          );
          done();
        });
    });
  });

  describe('Move to cart - GET /shoppingcart/moveToCart/:id', () => {
    describe('Validations', () => {
      it('should handle invalid item IDs', done => {
        chai
          .request(app)
          .get('/api/shoppingcart/moveToCart/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('item ID must be a number');
            done();
          });
      });
    });

    it('should move an item to cart successfully', done => {
      chai
        .request(app)
        .get(`/api/shoppingcart/moveToCart/${itemId}`)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('item moved successfully');
          done();
        });
    });

    it('should handle nonexistent items', done => {
      chai
        .request(app)
        .get('/api/shoppingcart/moveToCart/100')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('item not found');
          done();
        });
    });
  });

  describe('Remove from cart - DELETE /shoppingcart/removeProduct/:id', () => {
    describe('Validations', () => {
      it('should handle invalid item IDs', done => {
        chai
          .request(app)
          .delete('/api/shoppingcart/removeProduct/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('item ID must be a number');
            done();
          });
      });
    });

    it('should remove an item from cart successfully', done => {
      chai
        .request(app)
        .delete(`/api/shoppingcart/removeProduct/${itemId}`)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('item removed successfully');
          done();
        });
    });

    it('should handle duplicate items', done => {
      chai
        .request(app)
        .delete(`/api/shoppingcart/removeProduct/${itemId}`)
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('item not found');
          done();
        });
    });
  });
});
