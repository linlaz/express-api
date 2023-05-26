import Sequelize from 'sequelize';

import environment from '../environment';

const env = process.env.NODE_ENV || 'production';
export default new Sequelize(
  environment[env].database,
  environment[env].username,
  environment[env].password,
  environment[env],
);
