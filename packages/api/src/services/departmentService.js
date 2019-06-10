import { DepartmentModel } from '../database/models';

/**
 * This class contains all department related actions.
 * It is used by the department controller.
 * @class
 */
class DepartmentService {
  constructor() {
    this.DepartmentModel = new DepartmentModel();
  }

  /**
   * retrieves all departments
   * @returns {Array} a list of all the departments
   */
  async getAll() {
    const departments = await this.DepartmentModel.getAll();
    return departments;
  }

  /**
   * retrieves a single department
   * @returns {(Object|null)} the department or null if not found
   */
  async get(id) {
    const department = await this.DepartmentModel.getByID(id);
    return department[0];
  }
}

export default DepartmentService;
