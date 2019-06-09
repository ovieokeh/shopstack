import { DepartmentModel } from '../database/models';

/**
 * This class contains all department related actions.
 * It is used by the department controller.
 * @class
 */
class DepartmentService {
  /**
   * retrieves all departments
   * @returns {Array} a list of all the departments
   * @static
   */
  static async getAll() {
    const departments = await DepartmentModel.getAll();
    return departments;
  }

  /**
   * retrieves a single department
   * @returns {(Object|null)} the department or null if not found
   * @static
   */
  static async get(id) {
    const department = await DepartmentModel.getByID(id);
    return department[0];
  }
}

export default DepartmentService;
