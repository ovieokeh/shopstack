import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import app from '../src/index';

chai.use(chaiHttp);

describe('Department', () => {
  describe('Get all - GET /departments', () => {
    it('should get return an array of departments', done => {
      chai
        .request(app)
        .get('/api/departments')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('departments retrieved successfully');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.be(3);
          done();
        });
    });
  });

  describe('Get One - GET /departments/:id', () => {
    describe('Validations', () => {
      it('should handle invalid department IDs', done => {
        chai
          .request(app)
          .get('/api/departments/err')
          .end((_, res) => {
            expect(res.status).to.be(400);
            expect(res.body.message).to.be('department ID must be a number');
            done();
          });
      });
    });

    it('should get a department successfully', done => {
      chai
        .request(app)
        .get('/api/departments/1')
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('department retrieved successfully');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.name).to.be('Regional');
          done();
        });
    });

    it('should handle nonexistent departments', done => {
      chai
        .request(app)
        .get('/api/departments/100')
        .end((_, res) => {
          expect(res.status).to.be(404);
          expect(res.body.message).to.be('department not found');
          done();
        });
    });
  });
});
