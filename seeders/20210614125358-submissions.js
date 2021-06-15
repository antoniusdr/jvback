"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("submissions", [
      {
        trackName:
          "Ariana Grande - 34+35 (Citypop ver.) 아리아나 그란데 시티팝 버전",
        soundcloudUrl:
          "https://soundcloud.com/danpiamuzik/ariana-grande-3435-citypop-ver",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        contestId: 1,
      },
      {
        trackName: "TWICE - I CAN'T STOP ME (Feat. Blackpink, redvelvet)",
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
