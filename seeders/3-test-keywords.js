"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Keywords", [
      {
        searchTerm: "iphone",
        subreddit: "apple",
        ProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "watch",
        subreddit: "apple",
        ProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "mac",
        subreddit: "apple",
        ProjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "vaccine",
        subreddit: "coronavirus",
        ProjectId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "vaccines",
        subreddit: "coronavirus",
        ProjectId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "pfizer",
        subreddit: "coronavirus",
        ProjectId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "moderna",
        subreddit: "coronavirus",
        ProjectId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "obama",
        subreddit: "politics",
        ProjectId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "biden",
        subreddit: "politics",
        ProjectId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "bush",
        subreddit: "politics",
        ProjectId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "trump",
        subreddit: "politics",
        ProjectId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "obama",
        subreddit: "conservative",
        ProjectId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "biden",
        subreddit: "conservative",
        ProjectId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "bush",
        subreddit: "conservative",
        ProjectId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        searchTerm: "trump",
        subreddit: "conservative",
        ProjectId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
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
