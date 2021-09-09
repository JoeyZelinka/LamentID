'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsToMany(models.Keyword,{ through:"KeywordComments" })
    }
  };
  Comment.init({
    data: DataTypes.JSONB,
    sentiment: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};