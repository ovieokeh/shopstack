import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { respond } from '../utilities';

dotenv.config();

/**
 * Middleware to verify a customer's token. If successful,
 * stores the customer's details in the HTTP request object.
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
const verifyToken = async (request, response, next) => {
  // const bearer = request.headers['user-key'];
  // const privateKey = process.env.SECRET_KEY;

  // if (!bearer) {
  //   respond(response, 'error', 401, 'no token provided');
  //   return;
  // }

  // const accessToken = bearer.split(' ')[1];

  // jwt.verify(accessToken, privateKey, async (error, decoded) => {
  //   if (error) {
  //     respond(response, 'error', 401, 'unable to verify token');
  //     return;
  //   }

  //   const customer = await Customer.findByPk(decoded.customerId);

  //   if (!customer) {
  //     respond(response, 'error', 401, 'unable to verify token');
  //     return;
  //   }

  //   delete customer.dataValues.password;
  //   request.customer = customer;

  //   next();
  // });
  next();
};

export default verifyToken;
