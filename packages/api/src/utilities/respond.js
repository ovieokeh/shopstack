/**
 * Helper function to format HTTP responses
 * @param {Object} response object
 * @param {String} status success/error
 * @param {Number} statusCode
 * @param {undefined|String} message
 * @param {(undefined|Object)} data
 */
function respond(response, status, statusCode, message = undefined, data = undefined) {
  response.status(statusCode).json({
    status,
    message,
    data,
  });
}

export default respond;
