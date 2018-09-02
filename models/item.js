module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("items", {
    name: DataTypes.STRING,
    description:DataTypes.STRING,
    type: DataTypes.TEXT,
    material:DataTypes.TEXT,
    color:DataTypes.TEXT,
    season:DataTypes.TEXT,
    price:DataTypes.INTEGER
  });
  return Item;
};
