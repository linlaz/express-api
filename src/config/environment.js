/* eslint-disable import/no-import-module-exports */
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST_DEV,
  DB_USERNAME_DEV,
  DB_PASSWORD_DEV,
  DB_DIALECT_DEV,
  DB_PORT_DEV,
  DB_NAME_DEV,
  APP_URL_DEV,
  APP_PORT_DEV,
} = process.env;

const {
  DB_HOST_TEST,
  DB_USERNAME_TEST,
  DB_PASSWORD_TEST,
  DB_DIALECT_TEST,
  DB_PORT_TEST,
  DB_NAME_TEST,
  APP_URL_TEST,
  APP_PORT_TEST,
} = process.env;

const {
  DB_HOST_PROD,
  DB_USERNAME_PROD,
  DB_PASSWORD_PROD,
  DB_DIALECT_PROD,
  DB_PORT_PROD,
  DB_NAME_PROD,
  APP_URL_PROD,
  APP_PORT_PROD,
} = process.env;

module.exports = {
  development: {
    appUrl: APP_URL_DEV,
    appPort: APP_PORT_DEV,
    host: DB_HOST_DEV,
    username: DB_USERNAME_DEV,
    password: DB_PASSWORD_DEV,
    port: DB_PORT_DEV,
    database: DB_NAME_DEV,
    dialect: DB_DIALECT_DEV,
    pool: { maxConnections: 5, maxIdleTime: 30 },
    logging: console.log,
    maxConcurrentQueries: 100,
    language: 'en',
    minifyAliases: true,
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+05:30',
  },
  test: {
    appUrl: APP_URL_TEST,
    appPort: APP_PORT_TEST,
    host: DB_HOST_TEST,
    username: DB_USERNAME_TEST,
    password: DB_PASSWORD_TEST,
    port: DB_PORT_TEST,
    database: DB_NAME_TEST,
    dialect: DB_DIALECT_TEST,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: { maxConnections: 5, maxIdleTime: 30 },
    logging: false,
    maxConcurrentQueries: 100,
    language: 'en',
    minifyAliases: true,
  },
  production: {
    appUrl: APP_URL_PROD,
    appPort: APP_PORT_PROD,
    host: DB_HOST_PROD,
    username: DB_USERNAME_PROD,
    password: DB_PASSWORD_PROD,
    port: DB_PORT_PROD,
    database: DB_NAME_PROD,
    dialect: DB_DIALECT_PROD,
    pool: { maxConnections: 5, maxIdleTime: 10000 },
    logging: false,
    maxConcurrentQueries: 100,
    language: 'en',
    minifyAliases: true,
  },
};
