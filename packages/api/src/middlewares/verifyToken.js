import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { CustomerModel } from '../database/models';
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
  const CM = new CustomerModel();
  const bearer = request.headers['user-key'];
  const privateKey = process.env.SECRET_KEY;

  if (!bearer) {
    respond(response, 'error', 401, 'no token provided');
    return;
  }

  const accessToken = bearer.split(' ')[1];

  jwt.verify(accessToken, privateKey, async (error, decoded) => {
    if (error) {
      respond(response, 'error', 401, 'unable to verify token');
      return;
    }

    const customer = await CM.getByID(decoded.customer_id);

    if (!customer) {
      respond(response, 'error', 401, 'unable to verify token');
      return;
    }

    request.customer = customer;

    next();
  });
};

export default verifyToken;
