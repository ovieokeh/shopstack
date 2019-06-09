import runQuery from '..';

class TaxModel {
  static async getAll() {
    const taxes = await runQuery('SELECT * FROM tax');
    return taxes;
  }

  static async getByID(id) {
    const tax = await runQuery('SELECT * FROM tax WHERE tax_id = ?', [id]);
    return tax[0];
  }
}

export default TaxModel;
