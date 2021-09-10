'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      // password = test
      password: '$2a$10$j8UfV0KzAT82K.aUGYWoCOWdBO5PvomXle3GN1MhJqr6/W.Ilidcy',
      email: 'test@test.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
