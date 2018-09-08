module.exports = function(sequelize, DataTypes) {
    var Material = sequelize.define("materials", {
      name: {
        type:DataTypes.STRING,
        allowNull: false
      }
    });
    return Material;
  };
  