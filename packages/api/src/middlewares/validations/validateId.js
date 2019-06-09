import { respond } from '../../utilities';

/**
 * Validates that the ID is a number
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
function validateId(model) {
  return (request, response, next) => {
    const { id } = request.params;

    if (Number.isNaN(+id)) {
      respond(response, 'error', 400, `${model} ID must be a number`);
      return;
    }

    next();
  };
}

export default validateId;
