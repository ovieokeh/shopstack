import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import app from '../src/index';

chai.use(chaiHttp);

describe('Shipping', () => {
  describe('Get all - GET /shipping/regions', () => {
    it('should get all shipping regions', done => {
      chai
        .request(app)
        .get('/api/shipping/regions')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be(4);
          done();
        });
    });
  });

  describe('Get one - GET /shipping/regions/:id', () => {
    describe('Validations', () => {
      it('should handle invalid shipping IDs', done => {
        chai
          .request(app)
          .get('/api/shipping/regions/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('shipping ID must be a number');
            done();
          });
      });
    });

    it('should get all regions details successfully', done => {
      chai
        .request(app)
        .get('/api/shipping/regions/2')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('shipping details retrieved successfully');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be(3);
          done();
        });
    });

    it('should handle nonexistent shipping', done => {
      chai
        .request(app)
        .get('/api/shipping/regions/10')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('details not found for shipping with ID 10');
          done();
        });
    });
  });
});
