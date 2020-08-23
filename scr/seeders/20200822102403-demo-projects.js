'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //"user_id": 1,
    //"user_id": 3,
    //"user_id": 4,
    await queryInterface.bulkInsert('projects', [
      {
        "name": "Project1",
        "body" : "Test body for Project1",
        "status": "completed",
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Project2",
        "body" : "Test body for Project2",
        "status": "active",
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Project3",
        "body" : "Test body for Project3",
        "status": "inactive",
        "created_at": new Date(),
        "updated_at" : new Date()
      }
    ], {});

    await queryInterface.bulkInsert('project_workers', [
      {
        "author": "true",
        "project_id": 1,
        "user_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "true",
        "project_id": 2,
        "user_id": 3,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "true",
        "project_id": 3,
        "user_id": 4,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
    ], {});

    await queryInterface.bulkInsert('project_workers', [
      {
        "author": "false",
        "project_id": 1,
        "user_id": 3,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "project_id": 2,
        "user_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "project_id": 2,
        "user_id": 2,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "project_id": 2,
        "user_id": 4,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "project_id": 3,
        "user_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "project_id": 3,
        "user_id": 3,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
      
    await queryInterface.bulkDelete('projects', null, {});
    await queryInterface.bulkDelete('project_workers', null, {});

  }
};
