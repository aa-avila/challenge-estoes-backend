'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Projects',
      [
        {
          name: 'Landing page',
          description: 'Creacion de landing page.',
          projectManagerId: 1,
          projectStatusId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'E-Commerce Shop',
          description: 'E-Commerce para una tienda de alfajores.',
          projectManagerId: 3,
          projectStatusId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Projects', null, {});
  }
};
