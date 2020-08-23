'use strict';
module.exports = (sequelize, DataTypes) => {
  var project = sequelize.define('project', {
    name: {
         type : DataTypes.STRING,
         allowNull: false,
         unique: true 
        },
    body: {
        type : DataTypes.TEXT,
        allowNull: false,
          },
    status: {
        type : DataTypes.ENUM,
        values: ['active', 'inactive', 'declined', 'completed'],
        allowNull: false,
        }
  },{
    underscored: true,
  });

  
  project.associate = function(models) {

  project.hasMany(models.task,{
      onDelete : 'CASCADE',  
    });

  project.belongsToMany(models.user, {through: models.projectWorker});

  project.addScope('includeUsers', query=>({
    //sequelize.query(`SELECT * FROM users where "users"."name" like 'Igor'`, { model: Candidate})
    
    include:{
      model: models.user,
      where: models.sequelize.literal(query)
    }
    }))

    
    project.addScope('includeCompeletedTasks', {
      
      include:[{
        model: models.task,
        as: 'tasks',
        where: {status: 'completed'}
      }]
      
      /*
      [models.sequelize.query(`SELECT AVG(tasks.mark) AS total_mark FROM projects AS  p 
                                LEFT OUTER JOIN tasks t 
                              WHERE t.project_id=p.project_id AND t.status='completed'`)]
      */
    })
  
  }


  return project;
};

/*
SELECT "project"."id", "project"."name", "project"."body", "project"."status",
 "project"."created_at" AS "createdAt",
  "project"."updated_at" AS "updatedAt",
   "tasks"."id" AS "tasks.id",
    "tasks"."name" AS "tasks.name",
     "tasks"."description" AS "tasks.description",
      "tasks"."status" AS "tasks.status",
       "tasks"."mark" AS "tasks.mark",
        "tasks"."created_at" AS "tasks.createdAt",
         "tasks"."updated_at" AS "tasks.updatedAt",
          "tasks"."project_id" AS "tasks.projectId",
           AVG('tasks.mark') AS "tasks.avg_mark"
            FROM "projects" AS "project"
            LEFT OUTER JOIN "tasks" AS "tasks"
             ON "project"."id" = "tasks"."project_id";
             */