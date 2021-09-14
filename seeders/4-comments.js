"use strict";
const fs = require("fs");
const path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const directoryPath = path.join(__dirname, "seeder_data");
    const files = fs.readdirSync(directoryPath);
    // map to an array
    const comments = files.map((file) => {
      // read the file
      const data = fs.readFileSync(directoryPath + "/" + file, "utf8");
      // convert from json
      const comment = JSON.parse(data);
      return {
        data: JSON.stringify(comment.data),
        sentiment: JSON.stringify(comment.sentiment),
        redditId: comment.data.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    // insert data into db
    return queryInterface.bulkInsert("Comments", comments);
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
