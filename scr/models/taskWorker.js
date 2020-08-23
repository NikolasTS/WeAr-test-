'use strict';
module.exports = (sequelize, DataTypes) => {
  var taskWorker = sequelize.define('taskWorker', {
    author: {
         type : DataTypes.BOOLEAN,
         allowNull: false, 
         defaultValue: false
        }
  },{
    underscored: true,
  });


  return taskWorker;
};