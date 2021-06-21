"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      submission.belongsTo(models.user, { foreignKey: "userId", as: "create" });
      submission.belongsTo(models.contest, { foreignKey: "contestId" });
      submission.belongsToMany(models.user, {
        through: "userVotes",
        foreignKey: "submissionId",
        as: "voting",
      });
    }
  }
  submission.init(
    {
      soundcloudUrl: { type: DataTypes.STRING, allowNull: false },
      songDescription: { type: DataTypes.STRING },
      trackScore: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "submission",
    }
  );
  return submission;
};
