/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// const fs = require('fs');
// const Sequelize = require('sequelize');
// const path = require('path');
// const environment = require('../config/environment');
import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize';
import environment from '../config/environment';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'production';
const db = {};

const sequelize = new Sequelize(
  environment[env].database,
  environment[env].username,
  environment[env].password,
  environment[env],
);

fs
  .readdirSync(__dirname)
  // eslint-disable-next-line no-undef
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // Sequelize version <= 5.x
    // const model = sequelize.import(path.join(models, file));
    // Sequelize version >= 6.x
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.Sequelize = Sequelize; // for accessing static props and functions like Op.or
db.sequelize = sequelize;
// for accessing connection props and functions like 'query' or 'transaction'

export default db;
