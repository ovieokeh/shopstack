import runQuery from '..';

class DepartmentModel {
  static async getAll() {
    const departments = await runQuery('CALL catalog_get_departments()');
    return departments[0];
  }

  static async getByID(id) {
    const department = await runQuery('CALL catalog_get_department_details(?)', [id]);
    return department[0];
  }
}

export default DepartmentModel;
