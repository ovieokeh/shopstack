import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import app from '../src/index';
import { addCustomer } from './helpers';

chai.use(chaiHttp);

describe('Product', () => {
  const dummyReview = {
    review: 'this product makes me old',
    rating: 3,
  };
  let customerToken;

  before(async () => {
    customerToken = await addCustomer({
      name: 'Tella Man',
      email: 'tellaman@dummy.com',
      password: 'password1',
    });
  });

  describe('Get all - GET /products', () => {
    describe('Filtering', () => {
      it('should handle filtering by limit', done => {
        chai
          .request(app)
          .get('/api/products?limit=5')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.data.count).to.be(5);
            expect(res.body.data.products[0].product_id).to.be(10);
            done();
          });
      });

      it('should handle filtering by page', done => {
        chai
          .request(app)
          .get('/api/products?page=2')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.data.count).to.be(20);
            expect(res.body.data.page).to.be(2);
            expect(res.body.data.products[0].product_id).to.be(39);
            done();
          });
      });

      it('should handle filtering by page + limit', done => {
        chai
          .request(app)
          .get('/api/products?page=2&limit=10')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.data.count).to.be(10);
            expect(res.body.data.page).to.be(2);
            expect(res.body.data.products[0].product_id).to.be(19);
            done();
          });
      });

      it('should handle filtering description length', done => {
        chai
          .request(app)
          .get('/api/products?descriptionLength=10')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.data.count).to.be(20);
            expect(res.body.data.page).to.be(1);
            expect(res.body.data.products[0].description.length).to.be(13); // we have to account for the ellipsis
            done();
          });
      });
    });

    it('should get all products', done => {
      chai
        .request(app)
        .get('/api/products')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.data.count).to.be(20);
          expect(res.body.data.page).to.be(1);
          expect(res.body.data.products.length).to.be(20);
          done();
        });
    });
  });

  describe('Get one - GET /products/:id', () => {
    describe('Validations', () => {
      it('should handle invalid product IDs', done => {
        chai
          .request(app)
          .get('/api/products/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('product ID must be a number');
            done();
          });
      });
    });

    it('should get a product successfully', done => {
      chai
        .request(app)
        .get('/api/products/1')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('product retrieved successfully');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.product_id).to.be(1);
          done();
        });
    });

    it('should handle nonexistent products', done => {
      chai
        .request(app)
        .get('/api/products/1000')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('product not found');
          done();
        });
    });
  });

  describe('Search - GET /products/search', () => {
    describe('Filtering', () => {
      it('should handle filtering by limit', done => {
        chai
          .request(app)
          .get('/api/products/search?queryString=italy&limit=3')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.message).to.be('results retrieved successfully');
            expect(res.body.data.count).to.be(3);
            expect(res.body.data.page).to.be(1);
            done();
          });
      });

      it('should handle filtering by page', done => {
        chai
          .request(app)
          .get('/api/products/search?queryString=beautiful&page=2')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.message).to.be('results retrieved successfully');
            expect(res.body.data.count).to.be(5);
            expect(res.body.data.page).to.be(2);
            done();
          });
      });

      it('should handle filtering by page + limit', done => {
        chai
          .request(app)
          .get('/api/products/search?queryString=beautiful&page=2&limit=10')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.message).to.be('results retrieved successfully');
            expect(res.body.data.count).to.be(10);
            expect(res.body.data.page).to.be(2);
            done();
          });
      });

      it('should handle filtering description length', done => {
        chai
          .request(app)
          .get('/api/products/search?queryString=beautiful&descriptionLength=10')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.message).to.be('results retrieved successfully');
            expect(res.body.data.count).to.be(20);
            expect(res.body.data.results[0].description.length).to.be(13); // we have to account for the ellipsis
            done();
          });
      });
    });

    it('should return search results successfully', done => {
      chai
        .request(app)
        .get('/api/products/search?queryString=italy')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('results retrieved successfully');
          expect(res.body.data.results).to.not.be(null);
          done();
        });
    });

    it('should handle nonexistent search results', done => {
      chai
        .request(app)
        .get('/api/products/search?queryString=plinkly')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('no product matches those criteria');
          done();
        });
    });
  });

  describe('Get in category - GET /products/inCategory/:id', () => {
    describe('Validations', () => {
      it('should handle invalid category IDs', done => {
        chai
          .request(app)
          .get('/api/products/inCategory/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('category ID must be a number');
            done();
          });
      });
    });

    describe('Filtering', () => {
      it('should handle filtering by limit', done => {
        chai
          .request(app)
          .get('/api/products/inCategory/1?limit=3')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.message).to.be('products retrieved successfully');
            expect(res.body.data.count).to.be(3);
            expect(res.body.data.page).to.be(1);
            done();
          });
      });

      it('should handle filtering by page', done => {
        chai
          .request(app)
          .get('/api/products/inCategory/4?page=2')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.message).to.be('products retrieved successfully');
            expect(res.body.data.page).to.be(2);
            done();
          });
      });

      it('should handle filtering by page + limit', done => {
        chai
          .request(app)
          .get('/api/products/inCategory/1?limit=3&page=2')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.message).to.be('products retrieved successfully');
            expect(res.body.data.count).to.be(3);
            expect(res.body.data.page).to.be(2);
            done();
          });
      });

      it('should handle filtering description length', done => {
        chai
          .request(app)
          .get('/api/products/inCategory/1?descriptionLength=10')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.message).to.be('products retrieved successfully');
            expect(res.body.data.count).to.be(18);
            expect(res.body.data.products[0].description.length).to.be(13); // we have to account for the ellipsis
            done();
          });
      });
    });

    it('should get products successfully', done => {
      chai
        .request(app)
        .get('/api/products/inCategory/1')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('products retrieved successfully');
          expect(res.body.data.count).to.be(18);
          expect(res.body.data.page).to.be(1);
          done();
        });
    });

    it('should handle nonexistent categories', done => {
      chai
        .request(app)
        .get('/api/products/inCategory/100')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('no product found for category with ID 100');
          done();
        });
    });
  });

  describe('Get in department - GET /products/inDepartment/:id', () => {
    describe('Validations', () => {
      it('should handle invalid department IDs', done => {
        chai
          .request(app)
          .get('/api/products/inDepartment/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('department ID must be a number');
            done();
          });
      });
    });

    describe('Filtering', () => {
      it('should handle filtering by limit', done => {
        chai
          .request(app)
          .get('/api/products/inDepartment/1?limit=3')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.message).to.be('products retrieved successfully');
            expect(res.body.data.count).to.be(3);
            expect(res.body.data.page).to.be(1);
            done();
          });
      });

      it('should handle filtering by page', done => {
        chai
          .request(app)
          .get('/api/products/inDepartment/2?page=2')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.message).to.be('products retrieved successfully');
            expect(res.body.data.page).to.be(2);
            done();
          });
      });

      it('should handle filtering by page + limit', done => {
        chai
          .request(app)
          .get('/api/products/inDepartment/1?limit=3&page=2')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.message).to.be('products retrieved successfully');
            expect(res.body.data.count).to.be(3);
            expect(res.body.data.page).to.be(2);
            done();
          });
      });

      it('should handle filtering description length', done => {
        chai
          .request(app)
          .get('/api/products/inDepartment/1?descriptionLength=10')
          .end((_, res) => {
            expect(res.status).to.be(200);
            expect(res.body.message).to.be('products retrieved successfully');
            expect(res.body.data.count).to.be(20);
            expect(res.body.data.products[0].description.length).to.be(13); // we have to account for the ellipsis
            done();
          });
      });
    });

    it('should get products successfully', done => {
      chai
        .request(app)
        .get('/api/products/inDepartment/1')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('products retrieved successfully');
          expect(res.body.data.count).to.be(20);
          expect(res.body.data.page).to.be(1);
          done();
        });
    });

    it('should handle nonexistent categories', done => {
      chai
        .request(app)
        .get('/api/products/inDepartment/100')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('no product found for department with ID 100');
          done();
        });
    });
  });

  describe('Get locations - GET /products/:id/locations', () => {
    describe('Validations', () => {
      it('should handle invalid product IDs', done => {
        chai
          .request(app)
          .get('/api/products/err/locations')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('product ID must be a number');
            done();
          });
      });
    });

    it('should get the locations of a product successfully', done => {
      chai
        .request(app)
        .get('/api/products/1/locations')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('product locations retrieved successfully');
          expect(res.body.data.department_id).to.be(1);
          expect(res.body.data.category_id).to.be(1);
          done();
        });
    });

    it('should handle nonexistent products', done => {
      chai
        .request(app)
        .get('/api/products/1000/locations')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('location details not found for product with ID 1000');
          done();
        });
    });
  });

  describe('Post review - POST /products/:id/reviews', () => {
    describe('Validations', () => {
      it('should handle invalid product IDs', done => {
        chai
          .request(app)
          .post('/api/products/err/reviews')
          .set('user-key', customerToken)
          .send(dummyReview)
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('product ID must be a number');
            done();
          });
      });

      it('should handle missing fields', done => {
        chai
          .request(app)
          .post('/api/products/1/reviews')
          .set('user-key', customerToken)
          .send()
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.review.msg).to.be('review field is required');
            expect(res.body.data.rating.msg).to.be('rating field is required');
            done();
          });
      });
    });

    it('should post a review successfully', done => {
      chai
        .request(app)
        .post('/api/products/1/reviews')
        .set('user-key', customerToken)
        .send(dummyReview)
        .end((_, res) => {
          expect(res.status).to.be(201);
          expect(res.body.message).to.be('review posted successfully');
          expect(res.body.data).to.be(true);
          done();
        });
    });

    it('should handle nonexistent products', done => {
      chai
        .request(app)
        .post('/api/products/1000/reviews')
        .set('user-key', customerToken)
        .send(dummyReview)
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('product not found');
          done();
        });
    });
  });

  describe('Get reviews - GET /products/:id/reviews', () => {
    describe('Validations', () => {
      it('should handle invalid product IDs', done => {
        chai
          .request(app)
          .get('/api/products/err/reviews')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('product ID must be a number');
            done();
          });
      });
    });

    it('should get all reviews successfully', done => {
      chai
        .request(app)
        .get('/api/products/1/reviews')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('reviews retrieved successfully');
          expect(res.body.data.length).to.be(1); // because we posted one review above
          done();
        });
    });

    it('should handle nonexistent reviews', done => {
      chai
        .request(app)
        .get('/api/products/1001/reviews')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('product not found');
          done();
        });
    });
  });
});
