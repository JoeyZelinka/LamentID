'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', [{
      // password = test
      name: "Apple Products",
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "r/coronavirus",
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "r/politics",
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "r/conservative",
      UserId: 1,
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
