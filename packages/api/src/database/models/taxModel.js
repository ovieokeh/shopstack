import Database from '..';

class TaxModel {
  constructor() {
    this.DB = Database;
  }

  async getAll() {
    const taxes = await this.DB.query('SELECT * FROM tax');
    return taxes;
  }

  async getByID(id) {
    const tax = await this.DB.query('SELECT * FROM tax WHERE tax_id = ?', [id]);
    return tax[0];
  }
}

export default TaxModel;
