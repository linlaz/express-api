/** @type {import('sequelize-cli').Migration} */
import bcrypt from 'bcrypt';

export async function up(queryInterface) {
  /**
   * Add seed commands here.
   *
   * Example:
  //  * await queryInterface.bulkInsert('People', [{
  //  *   name: 'John Doe',
  //  *   isBetaMember: false
  //  * }], {});
  */
  return queryInterface.bulkInsert('users', [{
    name: 'lin',
    password: bcrypt.hashSync('Linlaz', bcrypt.genSaltSync(10)),
    role: 'super-admin',
    created_at: new Date(),
    updated_at: new Date(),
  }]);
}
export async function down() {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
