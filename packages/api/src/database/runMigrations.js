import path from 'path';
import fs from 'fs';
import mysql from 'mysql2/promise';
import config from './config';

const { log } = console;

async function runQuery(conn, query) {
  await conn.query(query);
}

async function runFilesRecursively(files, url, conn) {
  while (files.length) {
    const file = files.shift();
    const filePath = path.join(`${url}/${file}`);
    const query = fs.readFileSync(filePath, { encoding: 'utf8' });

    try {
      await runQuery(conn, query);
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      ![1062, 1304, 1050].includes(error.errno) && log(error.message, file);
    }
  }
}

async function runMigrations() {
  const connection = await mysql.createConnection(config);

  const tablesSetup = `${__dirname}/migrations/tables`;
  const seederDataSetup = `${__dirname}/migrations/seeders/data`;
  const proceduresSetup = `${__dirname}/migrations/seeders/procedures`;
  const tables = [];
  const seeders = [];
  const procedures = [];

  fs.readdirSync(tablesSetup).forEach(fileName => tables.push(fileName));
  fs.readdirSync(seederDataSetup).forEach(fileName => seeders.push(fileName));
  fs.readdirSync(proceduresSetup).forEach(fileName => procedures.push(fileName));

  // create tables
  try {
    await runFilesRecursively(tables, `${__dirname}/migrations/tables`, connection);
  } catch (error) {
    log('table migrations failed:', error.message);
  }

  // add procedures
  try {
    await runFilesRecursively(procedures, `${__dirname}/migrations/seeders/procedures`, connection);
  } catch (error) {
    log('procedures migrations failed:', error.message);
  }

  // run seeders
  try {
    await runFilesRecursively(seeders, `${__dirname}/migrations/seeders/data`, connection);
  } catch (error) {
    log('seeders migrations failed:', error.message);
  }

  connection.destroy();
  log('migrations complete');
}

runMigrations();
