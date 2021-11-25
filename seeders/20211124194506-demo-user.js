'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Usuario',
          lastName: 'Demo',
          email: 'test@admin.com',
          password:
            '$2a$10$4hVG5w2RMM.P0ST64W2qC.jlrIaq7W09oTOwEq.UqxQ1vDZmaoaja', // password: 12345678
          userRoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario',
          lastName: 'Demo',
          email: 'test@standard.com',
          password:
            '$2a$10$4hVG5w2RMM.P0ST64W2qC.jlrIaq7W09oTOwEq.UqxQ1vDZmaoaja', // password: 12345678
          userRoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario1',
          lastName: 'Demo1',
          email: 'usuario1@admin.com',
          password:
            '$2a$10$4hVG5w2RMM.P0ST64W2qC.jlrIaq7W09oTOwEq.UqxQ1vDZmaoaja', // password: 12345678
          userRoleId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario2',
          lastName: 'Demo2',
          email: 'usuario2@standard.com',
          password:
            '$2a$10$4hVG5w2RMM.P0ST64W2qC.jlrIaq7W09oTOwEq.UqxQ1vDZmaoaja', // password: 12345678
          userRoleId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
