import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * Contains helper functions relating to authentication
 * @class
 */
class auth {
  /**
   * Hashes a plain text passwords and returns the hash
   * @param {String} password
   * @returns {String} the hashed password
   * @static
   */
  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  /**
   * Checks if a password matches the expected password
   * @param {String} password
   * @param {String} hash
   * @returns {Boolean}
   * @static
   */
  static verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  /**
   * Generates a JWT token encoding the user object specified
   * @param {Object} user
   * @returns {String} the JWT token
   * @static
   */
  static generateToken(user) {
    const privateKey = process.env.SECRET_KEY;
    const token = jwt.sign(user, privateKey, { expiresIn: '24h' });
    return token;
  }
}

export default auth;
