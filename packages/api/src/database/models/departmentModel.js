import Database from '..';

class DepartmentModel {
  constructor() {
    this.DB = Database;
  }

  async getAll() {
    const departments = await this.DB.query('CALL catalog_get_departments()');
    return departments[0];
  }

  async getByID(id) {
    const department = await this.DB.query('CALL catalog_get_department_details(?)', [id]);
    return department[0];
  }
}

export default DepartmentModel;
