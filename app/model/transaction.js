module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    id: DataTypes.STRING,
    amount: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        Transaction.belongsTo(models.Merchant);
      }
    }
  }); 
  return Transaction;
};