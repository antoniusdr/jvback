"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("userVotes", [
      {
        userId: "1",
        submissionId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "1",
        submissionId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "1",
        submissionId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "1",
        submissionId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "1",
        submissionId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("userVotes", null, {});
  },
};
