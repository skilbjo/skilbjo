module.exports = function(sequelize, DataTypes) {
  var Merchant = sequelize.define('Merchant', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING
    // , title: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   get: function() {
    //     return this.getDataValue('name');
    //   },
    //   set: function(v) { this.setDataValue('title', v.toString()); }
    // }
  }, {
    classMethods: {
      associate: function(models) {
        Merchant.hasMany(models.Transaction);
      }
    }
  });
  return Merchant;
};