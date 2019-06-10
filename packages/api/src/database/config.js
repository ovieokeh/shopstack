require('dotenv').config();

const connectionConfig = {};

switch (process.env.NODE_ENV) {
  case 'test':
    connectionConfig.host = process.env.DB_CONNECTION_HOST_TEST;
    connectionConfig.user = process.env.DB_CONNECTION_USER_TEST;
    connectionConfig.password = process.env.DB_CONNECTION_PASSWORD_TEST;
    connectionConfig.database = process.env.DB_CONNECTION_NAME_TEST;
    connectionConfig.multipleStatements = true;
    connectionConfig.waitForConnections = true;
    break;

  default:
    connectionConfig.host = process.env.DB_CONNECTION_HOST;
    connectionConfig.user = process.env.DB_CONNECTION_USER;
    connectionConfig.password = process.env.DB_CONNECTION_PASSWORD;
    connectionConfig.database = process.env.DB_CONNECTION_NAME;
    connectionConfig.multipleStatements = true;
    connectionConfig.waitForConnections = true;
}

module.exports = connectionConfig;
