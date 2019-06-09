import mysql from 'mysql2/promise';
import config from './config';

const DB = {};

// create the connection to database
(async function createConnection() {
  DB.connection = await mysql.createConnection(config);
})();

async function runQuery(query, params) {
  const [rows] = await DB.connection.execute(query, params);
  return rows;
}

export default runQuery;
