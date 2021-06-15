"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "testuser",
          lastName: "user",
          email: "test@test.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          discordName: "stress#1337",
          editBattleContestant: false,
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "a",
          lastName: "b",
          email: "a@a.com",
          password: bcrypt.hashSync("a", SALT_ROUNDS),
          discordName: "testuser#3131",
          editBattleContestant: true,
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Anton",
          lastName: "Respat",
          email: "antoniusr3101@gmail.com",
          password: bcrypt.hashSync("Caegttee1!", SALT_ROUNDS),
          discordName: "Soju#1337",
          editBattleContestant: true,
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
