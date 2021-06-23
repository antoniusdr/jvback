"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userVote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userVote.belongsTo(models.user);
      userVote.belongsTo(models.submission);
    }
  }
  userVote.init(
    {
      userId: DataTypes.INTEGER,
      submissionId: DataTypes.INTEGER,
      contestId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userVote",
    }
  );
  return userVote;
};
