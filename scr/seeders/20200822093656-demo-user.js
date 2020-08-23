'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', [
      {
        "name": "Igor",
        "surname": "Las",
        "name_r": "Игорь",
        "surname_r": "Лас",
        "email": "test_email1@mail.test",
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Andrey",
        "surname": "Test",
        "name_r": "Андрей",
        "surname_r": "Тест",
        "email": "test_email2@mail.test",
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Oleg",
        "surname": "Gost",
        "name_r": "Олег",
        "surname_r": "Гост",
        "email": "test_email3@mail.test",
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Misha",
        "surname": "West",
        "name_r": "Миша",
        "surname_r": "Вест",
        "email": "test_email4@mail.test",
        "created_at": new Date(),
        "updated_at" : new Date()
      }

  ], {});
    
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('users', null, {});

  }
};
