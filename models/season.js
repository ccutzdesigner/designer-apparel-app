module.exports = function(sequelize, DataTypes) {
    var Season = sequelize.define("seasons", {
      name: {
        type:DataTypes.STRING,
        allowNull: false
      }
    });
    return Season;
  };
  