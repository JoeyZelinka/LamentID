"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Keywords", [
      {
        searchTerm: "I",
        subreddit: "AskReddit",
        ProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "we",
        subreddit: "AskReddit",
        ProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "me",
        subreddit: "AskReddit",
        ProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "you",
        subreddit: "AskReddit",
        ProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "us",
        subreddit: "AskReddit",
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
