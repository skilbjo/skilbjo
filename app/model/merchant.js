module.exports = function(sequelize, DataTypes) {
  var Merchant = sequelize.define('Merchant', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Merchant.hasMany(models.Transaction);
      }
    }
  });
  return Merchant;
};