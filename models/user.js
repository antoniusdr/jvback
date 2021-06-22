"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.submission, { as: "newCreate" });
      user.belongsToMany(models.submission, {
        through: "userVotes",
        foreignKey: "userId",
      });
    }
  }
  user.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discordName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      editBattleContestant: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailOptIn: {
        type: DataTypes.BOOLEAN,
      },
      twitchHandle: {
        type: DataTypes.STRING,
      },
      instagramHandle: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
