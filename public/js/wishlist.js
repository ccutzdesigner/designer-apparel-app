// The API object contains methods for each kind of request we'll make
var wishListAPI = {
    saveToWishList: function (wishlist) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "/api/wishlist",
        data: JSON.stringify(wishlist)
      });
    }
  };

function addToWishList(itemId){
    if(sessionStorage.email){
    var wishlist = {
        email: sessionStorage.email,
        items: itemId
      };
      wishListAPI.saveToWishList(wishlist);
    }else{
        swal("Is't that a pretty item..","Please login and add to wishlist.","error");
        return;
    }
}