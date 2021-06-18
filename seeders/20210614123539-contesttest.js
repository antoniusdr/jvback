"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("contests", [
      {
        contestName: "Lady - Rema edits",
        isActive: false,
        imgUrl: "https://i.imgur.com/wirC7gD.jpg",
        description:
          "As announced earlier, the first iteration of the Vandalized Edit Battle is here! Make sure to take a good look at the image below.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        contestName: "City pop remixes",
        isActive: true,
        imgUrl: "https://i.imgur.com/4VQtA6G.jpg",
        description: "NEW CONTEST NEW CHANCES LESGOOOOO",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        contestName: "test data",
        isActive: true,
        imgUrl: "https://i.imgur.com/4VQtA6G.jpg",
        description: "test data letsgo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("contests", null, {});
  },
};
