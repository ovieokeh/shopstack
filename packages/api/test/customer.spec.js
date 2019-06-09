import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import app from '../src';

chai.use(chaiHttp);

describe('Customer', () => {
  const dummyCustomer = {
    name: 'Test Customer',
    email: 'testcustomer@example.com',
    password: 'password1',
  };
  const dummyAddress = {
    address1: 'Block 0, Flat 0',
    address2: 'That town',
    city: 'universe city',
    region: 'rest of the world',
    postalCode: 10000,
    country: 'Global',
    shippingRegionId: 4,
  };
  const dummyPhones = {
    dayPhone: '+123456789',
    evePhone: '+987654321',
    mobPhone: '+678954321',
  };
  const validCreditCard = '4299908212121231';
  const incompleteCreditCard = '4000909012';
  let token;

  describe('Register - POST /customers', () => {
    describe('Validations', () => {
      it('should handle missing fields', done => {
        chai
          .request(app)
          .post('/api/customers')
          .send()
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.name.msg).to.be('name field is required');
            expect(res.body.data.email.msg).to.be('email field is required');
            expect(res.body.data.password.msg).to.be('password field is required');
            done();
          });
      });

      it('should handle missing password field', done => {
        chai
          .request(app)
          .post('/api/customers')
          .send({
            name: dummyCustomer.name,
            email: dummyCustomer.email,
            password: undefined,
          })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.password.msg).to.be('password field is required');
            done();
          });
      });

      it('should handle missing email field', done => {
        chai
          .request(app)
          .post('/api/customers')
          .send({
            name: dummyCustomer.name,
            email: undefined,
            password: dummyCustomer.password,
          })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.email.msg).to.be('email field is required');
            done();
          });
      });

      it('should handle missing name field', done => {
        chai
          .request(app)
          .post('/api/customers')
          .send({
            name: undefined,
            email: dummyCustomer.email,
            password: dummyCustomer.password,
          })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.name.msg).to.be('name field is required');
            done();
          });
      });
    });

    it('should sign up a customer successfully', done => {
      chai
        .request(app)
        .post('/api/customers')
        .send(dummyCustomer)
        .end((_, res) => {
          expect(res.status).to.be(201);
          expect(res.body.message).to.be('customer created successfully');
          expect(res.body.accessToken).to.not.be(null);
          done();
        });
    });

    it('should handle a duplicate email', done => {
      chai
        .request(app)
        .post('/api/customers')
        .send({
          name: 'Test Customer',
          email: 'testcustomer@example.com',
          password: 'password1',
        })
        .end((_, res) => {
          expect(res.status).to.be(409);
          expect(res.body.message).to.be('this email address is already in use');
          done();
        });
    });
  });

  describe('Login - POST /customers/login', () => {
    describe('Validations', () => {
      it('should handle missing fields', done => {
        chai
          .request(app)
          .post('/api/customers/login')
          .send()
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.email.msg).to.be('email field is required');
            expect(res.body.data.password.msg).to.be('password field must not be empty');
            done();
          });
      });

      it('should handle missing email field', done => {
        chai
          .request(app)
          .post('/api/customers/login')
          .send({
            email: undefined,
            password: dummyCustomer.password,
          })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.email.msg).to.be('email field is required');
            done();
          });
      });

      it('should handle missing password field', done => {
        chai
          .request(app)
          .post('/api/customers/login')
          .send({
            email: dummyCustomer.email,
            password: undefined,
          })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.password.msg).to.be('password field must not be empty');
            done();
          });
      });
    });

    describe('Authorization', () => {
      it('should handle wrong password', done => {
        chai
          .request(app)
          .post('/api/customers/login')
          .send({
            email: dummyCustomer.email,
            password: 'wrongpassword',
          })
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('invalid login credentials');
            done();
          });
      });

      it('should handle wrong email', done => {
        chai
          .request(app)
          .post('/api/customers/login')
          .send({
            email: 'wrongemail@test.com',
            password: dummyCustomer.password,
          })
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('invalid login credentials');
            done();
          });
      });
    });

    it('should log in a customer successfully', done => {
      chai
        .request(app)
        .post('/api/customers/login')
        .send(dummyCustomer)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('customer logged in successfully');
          expect(res.body.customer).to.not.be(null);
          expect(res.body.accessToken).to.not.be(null);
          token = res.body.data.accessToken;
          done();
        });
    });
  });

  describe('Profile - PUT /customers', () => {
    describe('Authorization', () => {
      it('should handle requests without a token', done => {
        chai
          .request(app)
          .put('/api/customers')
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('no token provided');
            done();
          });
      });

      it('should handle requests with an invalid token', done => {
        chai
          .request(app)
          .put('/api/customers')
          .set('user-key', `${token}invalid`)
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('unable to verify token');
            done();
          });
      });
    });

    describe('Validation', () => {
      it('should handle missing details fields', done => {
        chai
          .request(app)
          .put('/api/customers')
          .set('user-key', token)
          .send({})
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.name.msg).to.be('name field is required');
            expect(res.body.data.email.msg).to.be('email field is required');
            done();
          });
      });
    });

    it("should successfully update a customer's details", done => {
      chai
        .request(app)
        .put('/api/customers')
        .set('user-key', token)
        .send({
          name: dummyCustomer.name,
          email: dummyCustomer.email,
          ...dummyPhones,
        })
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('customer updated successfully');
          expect(res.body.data.day_phone).to.be(dummyPhones.dayPhone);
          expect(res.body.data.eve_phone).to.be(dummyPhones.evePhone);
          expect(res.body.data.mob_phone).to.be(dummyPhones.mobPhone);
          done();
        });
    });
  });

  describe('Profile - PUT /customers/creditCard', () => {
    describe('Authorization', () => {
      it('should handle requests without a token', done => {
        chai
          .request(app)
          .put('/api/customers/creditCard')
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('no token provided');
            done();
          });
      });

      it('should handle requests with an invalid token', done => {
        chai
          .request(app)
          .put('/api/customers/creditCard')
          .set('user-key', `${token}invalid`)
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('unable to verify token');
            done();
          });
      });
    });

    describe('Validation', () => {
      it('should handle a missing creditCard field', done => {
        chai
          .request(app)
          .put('/api/customers/creditCard')
          .set('user-key', token)
          .send({})
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.creditCard.msg).to.be('creditCard field is required');
            done();
          });
      });

      it('should handle an empty creditCard field', done => {
        chai
          .request(app)
          .put('/api/customers/creditCard')
          .set('user-key', token)
          .send({ creditCard: '' })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.creditCard.msg).to.be('creditCard field must not be empty');
            done();
          });
      });

      it('should handle an incomplete creditCard number', done => {
        chai
          .request(app)
          .put('/api/customers/creditCard')
          .set('user-key', token)
          .send({ creditCard: incompleteCreditCard })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.creditCard.msg).to.be(
              'creditCard must be between 12 to 19 digits',
            );
            done();
          });
      });
    });

    it('should successfully update a creditCard', done => {
      chai
        .request(app)
        .put('/api/customers/creditCard')
        .set('user-key', token)
        .send({ creditCard: validCreditCard })
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('customer updated successfully');
          expect(res.body.data.credit_card).to.be(validCreditCard);
          done();
        });
    });
  });

  describe('Profile - PUT /customers/address', () => {
    describe('Authorization', () => {
      it('should handle requests without a token', done => {
        chai
          .request(app)
          .put('/api/customers/address')
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('no token provided');
            done();
          });
      });

      it('should handle requests with an invalid token', done => {
        chai
          .request(app)
          .put('/api/customers/address')
          .set('user-key', `${token}invalid`)
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('unable to verify token');
            done();
          });
      });
    });

    describe('Validation', () => {
      it('should handle missing address fields', done => {
        chai
          .request(app)
          .put('/api/customers/address')
          .set('user-key', token)
          .send({})
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.address1.msg).to.be('address1 field is required');
            done();
          });
      });
    });

    it('should successfully update an address', done => {
      chai
        .request(app)
        .put('/api/customers/address')
        .set('user-key', token)
        .send(dummyAddress)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('customer updated successfully');
          expect(res.body.data.address_1).to.be(dummyAddress.address1);
          expect(res.body.data.address_2).to.be(dummyAddress.address2);
          expect(res.body.data.country).to.be(dummyAddress.country);
          done();
        });
    });
  });

  describe('Profile - GET /customer', () => {
    describe('Authorization', () => {
      it('should handle requests without a token', done => {
        chai
          .request(app)
          .get('/api/customer')
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('no token provided');
            done();
          });
      });

      it('should handle requests with an invalid token', done => {
        chai
          .request(app)
          .get('/api/customer')
          .set('user-key', `${token}invalid`)
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('unable to verify token');
            done();
          });
      });
    });

    it("should retrieve a customer's profile successfully", done => {
      chai
        .request(app)
        .get('/api/customer')
        .set('user-key', token)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('customer retrieved successfully');
          expect(res.body.data).to.have.key('customer_id');
          done();
        });
    });
  });
});
