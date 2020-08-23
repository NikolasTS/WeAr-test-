'use strict';

const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  var task= sequelize.define('task', {
    name: {
         type : DataTypes.STRING,
         allowNull: false, 
         unique: true
        },
    description: {
        type : DataTypes.TEXT,
        field: 'description',
        allowNull: false,
          },
    status: {
        type : DataTypes.STRING,
        allowNull: false,
        },
    mark:{
        type: DataTypes.INTEGER
    }
  },{
    indexes:[

    ],
    underscored: true,
  });

  task.associate = function(models) {

    task.belongsToMany(models.user, {through: models.taskWorker});
    
    task.addScope('includeUsers', query=>({
    
      include:{
        model: models.user,
        where: models.sequelize.literal(query)
      }
      }) 
    )

  }
  

  return task;
};