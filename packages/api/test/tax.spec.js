import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import app from '../src/index';

chai.use(chaiHttp);

describe('Tax', () => {
  describe('Get all - GET /tax', () => {
    it('should get all taxes', done => {
      chai
        .request(app)
        .get('/api/tax')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be(2);
          done();
        });
    });
  });

  describe('Get one - GET /tax/:id', () => {
    describe('Validations', () => {
      it('should handle invalid tax IDs', done => {
        chai
          .request(app)
          .get('/api/tax/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('tax ID must be a number');
            done();
          });
      });
    });

    it('should get a tax successfully', done => {
      chai
        .request(app)
        .get('/api/tax/1')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('taxes retrieved successfully');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.tax_id).to.be(1);
          done();
        });
    });

    it('should handle nonexistent taxes', done => {
      chai
        .request(app)
        .get('/api/tax/100')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('tax not found');
          done();
        });
    });
  });
});
