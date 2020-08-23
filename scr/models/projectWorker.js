'use strict';
module.exports = (sequelize, DataTypes) => {
  var projectWorker = sequelize.define('projectWorker', {
    author: {
         type : DataTypes.BOOLEAN,
         allowNull: false, 
         defaultValue: false
        }
  },{
    underscored: true,
  });


  return projectWorker;
};