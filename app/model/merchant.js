module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Merchants', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    instanceMethods: Sequelize.Utils._.extend({}, friendlyUrlMethods, {
      countTasks: function() {
        return this.__factory.associations['Tasks'].target.count({ where: { user_id: this.id } });
      }
    })
  });
};