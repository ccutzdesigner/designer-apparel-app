module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define("messages", {
      name: {
        type:DataTypes.STRING,
        allowNull: false
      },
      email:{
        type:DataTypes.STRING,
        allowNull: false
      },
      message: {
        type:DataTypes.TEXT,
        allowNull: false
      },
      item:{
        type:DataTypes.STRING,
        allowNull: false
      }
    });
    return Message;
  };