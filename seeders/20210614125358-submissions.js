"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("submissions", [
      {
        songDescription: "Ariana yukika sheesh",
        trackScore: 10,
        soundcloudUrl:
          "https://soundcloud.com/danpiamuzik/ariana-grande-3435-citypop-ver",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        contestId: 1,
      },
      {
        songDescription: "crazy kpop mashup i did pog",
        trackScore: 9,
        soundcloudUrl:
          "https://soundcloud.com/danpiamuzik/twice-blackpink-red-velvet-i-cant-stop-me-mashup",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
        contestId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("submissions", null, {});
  },
};
