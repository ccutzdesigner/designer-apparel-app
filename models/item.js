module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("items", {
    name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    description:{
      type:DataTypes.STRING,
      allowNull: false
    },
    type: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    material:{
      type:DataTypes.TEXT,
      allowNull: false
    },
    color:{
      type:DataTypes.TEXT,
      allowNull: false
    },
    season:{
      type:DataTypes.TEXT,
      allowNull: false
    },
    price:{
      type:DataTypes.INTEGER
    },
   pic:{
      type:DataTypes.BLOB('long')
    }
  });
  return Item;
};
