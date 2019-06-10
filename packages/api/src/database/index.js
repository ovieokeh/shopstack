import mysql from 'mysql2';
import configuration from './config';

class Database {
  constructor(config) {
    this.connection = mysql.createPool(config);
    this.query = this.query.bind(this);
    this.close = this.close.bind(this);
  }

  async query(sql, args) {
    const [rows] = await this.connection.promise().query(sql, args);
    return rows;
  }

  async close() {
    await this.connection.promise().end(err => console.log('an error occurred:', err));
  }
}

module.exports = new Database(configuration);
