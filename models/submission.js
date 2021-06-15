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
      submission.belongsTo(models.user, { foreignKey: "id" });
      submission.belongsTo(models.contest, { foreignKey: "id" });
    }
  }
  submission.init(
    {
      soundcloudUrl: { type: DataTypes.STRING, allowNull: false },
      trackName: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "submission",
    }
  );
  return submission;
};
