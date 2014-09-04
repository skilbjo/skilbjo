var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , config  = require('../../config/config.js')
  , sequelize = new Sequelize(process.env.DATABASE_URL)
  // , sequelize = new Sequelize(config.db_host, config.username, config.password, { host: config.host, port: config.db_port, dialect: config.dialect })
  , db        = {};
 
fs.readdirSync(__dirname).filter(function(file) { return (file.indexOf('.') !== 0) && (file !== 'index.js'); })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });
 
Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});
 
module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);