"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Keywords", [
      {
        searchTerm: "you",
        subreddit: "RoastMe",
        ProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "you're",
        subreddit: "RoastMe",
        ProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
