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

    })
  
  }


  return project;
};
