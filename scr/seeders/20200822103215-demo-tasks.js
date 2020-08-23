'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('tasks', [
      {
        "name": "Task1",
        "description" : "Test body Task1",
        "status": "completed",
        "mark": 5,
        "project_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Task2",
        "description" : "Test body Task2",
        "status": "completed",
        "mark": 2,
        "project_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Task3",
        "description" : "Test body Task3",
        "status": "active",
        "mark": 7,
        "project_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Task4",
        "description" : "Test body Task4",
        "status": "declined",
        "mark": 1,
        "project_id": 2,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Task5",
        "description" : "Test body Task5",
        "status": "inactive",
        "mark": 15,
        "project_id": 2,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Task6",
        "description" : "Test body Task6",
        "status": "completed",
        "mark": 3,
        "project_id": 3,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Task7",
        "description" : "Test body Task7",
        "status": "completed",
        "mark": 2,
        "project_id": 3,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Task8",
        "description" : "Test body Task8",
        "status": "completed",
        "mark": 9,
        "project_id": 3,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "name": "Task9",
        "description" : "Test body Task9",
        "status": "inactive",
        "mark": 0,
        "project_id": 3,
        "created_at": new Date(),
        "updated_at" : new Date()
      }
    ], {});
    
    await queryInterface.bulkInsert('task_workers', [
      {
        "author": "true",
        "task_id": 1,
        "user_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "true",
        "task_id": 2,
        "user_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "true",
        "task_id": 3,
        "user_id": 2,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "true",
        "task_id": 4,
        "user_id": 3,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "true",
        "task_id": 5,
        "user_id": 2,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "true",
        "task_id": 6,
        "user_id": 4,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "true",
        "task_id": 7,
        "user_id": 4,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "true",
        "task_id": 8,
        "user_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "true",
        "task_id": 9,
        "user_id": 2,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
    ], {});

    await queryInterface.bulkInsert('task_workers', [
      {
        "author": "false",
        "task_id": 1,
        "user_id": 2,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "task_id": 2,
        "user_id": 3,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "task_id": 3,
        "user_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "task_id": 3,
        "user_id": 3,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "task_id": 4,
        "user_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "task_id": 4,
        "user_id": 2,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "task_id": 5,
        "user_id": 4,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "task_id": 6,
        "user_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "task_id": 7,
        "user_id": 1,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "task_id": 8,
        "user_id": 4,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "task_id": 9,
        "user_id": 3,
        "created_at": new Date(),
        "updated_at" : new Date()
      },
      {
        "author": "false",
        "task_id": 9,
        "user_id": 4,
        "created_at": new Date(),
        "updated_at" : new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('tasks', null, {});

    await queryInterface.bulkDelete('task_workers', null, {});
  }
};
