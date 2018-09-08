module.exports = function(sequelize, DataTypes) {
    var Type = sequelize.define("types", {
      name: {
        type:DataTypes.STRING,
        allowNull: false
      }
    });
    return Type;
  };
  