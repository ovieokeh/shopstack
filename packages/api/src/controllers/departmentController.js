import { DepartmentService } from '../services';
import { respond } from '../utilities';

/**
 * Handles all department related endpoints
 * @class
 */
class DepartmentController {
  /**
   * Handles the GET /departments endpoint
   * @param {Object} _
   * @param {Object} response
   * @static
   */
  static async getAll(_, response) {
    try {
      const departments = await DepartmentService.getAll();
      respond(response, 'success', 200, 'departments retrieved successfully', departments);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }

  /**
   * Handles the GET /departments/:id endpoint
   * @param {Object} request
   * @param {Object} response
   * @static
   */
  static async getOne(request, response) {
    try {
      const departmentId = request.params.id;
      const department = await DepartmentService.get(departmentId);

      if (!department) {
        respond(response, 'error', 404, 'department not found');
        return;
      }

      respond(response, 'success', 200, 'department retrieved successfully', department);
    } catch (error) {
      respond(response, 'error', 500, 'an error occurred', error.message);
    }
  }
}

export default DepartmentController;
