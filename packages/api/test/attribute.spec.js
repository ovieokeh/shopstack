import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import app from '../src/index';

chai.use(chaiHttp);

describe('Attributes', () => {
  describe('Get all - GET /attributes', () => {
    it('should get return an array of attributes', done => {
      chai
        .request(app)
        .get('/api/attributes')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('attributes retrieved successfully');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be(2);
          done();
        });
    });
  });

  describe('Get one - GET /attributes/:id', () => {
    describe('Validations', () => {
      it('should handle invalid attribute IDs', done => {
        chai
          .request(app)
          .get('/api/attributes/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('attribute ID must be a number');
            done();
          });
      });
    });

    it('should get a attribute successfully', done => {
      chai
        .request(app)
        .get('/api/attributes/1')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('attribute retrieved successfully');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.attribute_id).to.be(1);
          expect(res.body.data.name).to.be('Size');
          done();
        });
    });

    it('should handle nonexistent attributes', done => {
      chai
        .request(app)
        .get('/api/attributes/100')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('attribute not found');
          done();
        });
    });
  });

  describe('Get values - GET /attributes/values/:id', () => {
    describe('Validations', () => {
      it('should handle invalid attribute IDs', done => {
        chai
          .request(app)
          .get('/api/attributes/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('attribute ID must be a number');
            done();
          });
      });
    });

    it("should get a attribute's values successfully", done => {
      chai
        .request(app)
        .get('/api/attributes/values/1')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('attribute values retrieved successfully');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be(5);
          done();
        });
    });

    it('should handle nonexistent attributes', done => {
      chai
        .request(app)
        .get('/api/attributes/values/100')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('value not found for attribute with ID 100');
          done();
        });
    });
  });

  describe('Get product attributes - GET /attributes/inProduct/:id', () => {
    describe('Validations', () => {
      it('should handle invalid product IDs', done => {
        chai
          .request(app)
          .get('/api/attributes/inProduct/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('product ID must be a number');
            done();
          });
      });
    });

    it("should get a product's attributes successfully", done => {
      chai
        .request(app)
        .get('/api/attributes/inProduct/1')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('product attributes retrieved successfully');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be(14);
          done();
        });
    });

    it('should handle nonexistent attributes', done => {
      chai
        .request(app)
        .get('/api/attributes/inProduct/10000')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('attributes not found for product with ID 10000');
          done();
        });
    });
  });
});
