'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: {
         type : DataTypes.STRING,
         allowNull: false, 
        },
    surname: {
        type : DataTypes.STRING,
        allowNull: false,
          },
    name_r: {
      type : DataTypes.STRING,
      allowNull: false, 
      },
    surname_r: {
        type : DataTypes.STRING,
        allowNull: false,
          },
    email: {
        type : DataTypes.STRING,
        unique: true,
        allowNull: false,
        }
  },{
    indexes:[


  ],
    underscored: true,
  });

  user.associate = function(models) {

    user.belongsToMany(models.project, {through: models.projectWorker});

    user.belongsToMany(models.task, {through: models.taskWorker});

  }

  return user;
};

/*      {
        name: 'index_users_full_nam',
        using: 'gin',
        operator: 'gin_trgm_ops',
        fields: ['name','surname']
      }
      */

// ('name' || ' ' || 'surname')
/*
      {
      name: 'full_name',
      using: 'BTREE',
      fields: ['name', 'surname']
    },
    {
      name: 'full_name_r',
      using: 'BTREE',
      fields: ['name_r', 'surname_r']
    }
    */