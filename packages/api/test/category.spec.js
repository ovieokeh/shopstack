import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import app from '../src/index';

chai.use(chaiHttp);

describe('Categories', () => {
  describe('Get all - GET /categories', () => {
    it('should get return an array of categories', done => {
      chai
        .request(app)
        .get('/api/categories')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('categories retrieved successfully');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be(7);
          done();
        });
    });
  });

  describe('Get One - GET /categories/:id', () => {
    describe('Validations', () => {
      it('should handle invalid category IDs', done => {
        chai
          .request(app)
          .get('/api/categories/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('category ID must be a number');
            done();
          });
      });
    });

    it('should get a category successfully', done => {
      chai
        .request(app)
        .get('/api/categories/1')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('category retrieved successfully');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.name).to.be('French');
          done();
        });
    });

    it('should handle nonexistent categories', done => {
      chai
        .request(app)
        .get('/api/categories/100')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('category not found');
          done();
        });
    });
  });

  describe('Get All - GET /categories/inDepartment/:id', () => {
    describe('Validations', () => {
      it('should handle invalid category IDs', done => {
        chai
          .request(app)
          .get('/api/categories/inDepartment/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('department ID must be a number');
            done();
          });
      });
    });

    it('should get all categories of a department successfully', done => {
      chai
        .request(app)
        .get('/api/categories/inDepartment/1')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('categories retrieved successfully');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be(3);
          done();
        });
    });

    it('should handle nonexistent categories', done => {
      chai
        .request(app)
        .get('/api/categories/inDepartment/10000')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('no categories found for department with ID 10000');
          done();
        });
    });
  });

  describe('Get All - GET /categories/inProduct/:id', () => {
    describe('Validations', () => {
      it('should handle invalid product IDs', done => {
        chai
          .request(app)
          .get('/api/categories/inProduct/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('product ID must be a number');
            done();
          });
      });
    });

    it('should get all categories of a product successfully', done => {
      chai
        .request(app)
        .get('/api/categories/inProduct/1')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('categories retrieved successfully');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be(1);
          done();
        });
    });

    it('should handle nonexistent categories', done => {
      chai
        .request(app)
        .get('/api/categories/inProduct/10000')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('no categories found for product with ID 10000');
          done();
        });
    });
  });
});
