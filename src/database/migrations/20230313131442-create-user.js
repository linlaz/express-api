/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'Please enter a name',
        },
        isAlphanumeric: true,
        notEmpty: true,
        min: 2,
        max: 100,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a password',
        },
        min: 8,
      },
    },
    role: {
      type: Sequelize.ENUM,
      values: ['super-admin', 'admin', 'user'],
      defaultValue: 'user',
      validate: {
        isIn: {
          args: [['super-admin', 'admin', 'user']],
          msg: 'role user must super-admin, admin or user',
        },
      },
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('users');
}
