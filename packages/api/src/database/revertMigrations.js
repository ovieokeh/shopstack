import mysql from 'mysql2/promise';
import config from './config';

(async function revertMigrations() {
  const connection = await mysql.createConnection(config);
  await connection.query(`CALL drop_all_tables()`);

  const [dropProcedureCmds] = await connection.query(
    "SELECT CONCAT('DROP ',ROUTINE_TYPE,' `',ROUTINE_SCHEMA,'`.`',ROUTINE_NAME,'`;') as stmt FROM information_schema.ROUTINES WHERE ROUTINE_SCHEMA = ?;",
    [config.database],
  );

  // eslint-disable-next-line no-restricted-syntax
  for (const cmd of dropProcedureCmds) {
    await connection.query(cmd.stmt);
  }

  console.log('migrations reverted');
  connection.destroy();
})();
