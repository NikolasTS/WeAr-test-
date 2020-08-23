'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'dev';
var dbConfig    = require('../../config/config.json').development;
var db        = {};

var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync();
//db.sequelize.sync({force: true});



db.sequelize
  .authenticate()
  .then(() => {
    
    console.log(`Connection has been established successfully to ${db.sequelize.config.database} database`);
    
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

module.exports = db;