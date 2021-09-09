'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Keyword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Keyword.belongsTo(models.Project),
      Keyword.belongsToMany(models.Comment, {through:"KeywordComments"})
    }
  };
  Keyword.init({
    searchTerm: DataTypes.STRING,
    subreddit: DataTypes.STRING,
    ProjectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Keyword',
  });
  return Keyword;
};