module.exports = function(sequelize, DataTypes) {
    var WishList = sequelize.define("wishlists", {
      email: {
        type:DataTypes.STRING,
        allowNull: false
      },
      items:{
        type:DataTypes.INTEGER,
        allowNull: false,
        unique:true
      }
    });
    return WishList;
  };
  