'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ProjectStatuses',
      [
        {
          status: 'Unnable',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 'Enabled',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 'In progress',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 'Finished',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProjectStatuses', null, {});
  }
};
