/* eslint-disable import/no-import-module-exports */
import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            args: true,
            msg: 'Please enter a name',
          },
          isAlphanumeric: {
            msg: 'Name allowed only alphanumeric',
          },
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const hashedPassword = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
          this.setDataValue('password', hashedPassword);
        },
        validate: {
          notNull: {
            msg: 'Please enter a password',
          },
          min: {
            args: 8,
            msg: 'Password minimal 8 character',
          },
        },
      },
      role: {
        type: DataTypes.ENUM,
        values: ['super-admin', 'admin', 'user'],
        defaultValue: 'user',
        validate: {
          isIn: {
            args: [['super-admin', 'admin', 'user']],
            msg: 'role user must super-admin, admin or user',
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      freezeTableName: true,
    },
  );
  return User;
};
