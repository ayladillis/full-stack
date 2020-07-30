'use strict';

var fs        = require('fs'); // allows you to work with the file system on you're computer
var path      = require('path'); // the path module is used when working with file and directory paths
var Sequelize = require('sequelize'); // features transaction support, relations, eager and lazy loading
var basename  = path.basename(module.filename); // the basename method returns the last portion of a path
var env       = process.env.NODE_ENV || 'development'; // represents the state of the system environment your application is in when it starts
var config    = require(__dirname + '/../config/config.json')[env]; // returning a js object 
var db        = {}; // setting the database variable equal to an empty object 

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]); // if user already has an account
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config); // else if user needs to create an account 
}

fs
  .readdirSync(__dirname) // synchronously reads the content of a directory 
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
