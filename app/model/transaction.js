module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    TransactionId: DataTypes.STRING,
    Amount: DataTypes.DECIMAL
  }, {
    tableName: 'Transaction',
    timestamps: false, 
    classMethods: {
      associate: function(models) {
        Transaction.belongsTo(models.Merchant);
      }
    }
  }); 
  return Transaction;
};