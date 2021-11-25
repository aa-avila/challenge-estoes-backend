'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'UserRoles',
      [
        {
          role: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          role: 'Standard',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserRoles', null, {});
  }
};
