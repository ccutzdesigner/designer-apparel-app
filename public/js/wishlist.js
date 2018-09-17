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
  },
  deleteFromWishList: function (itemId) {
    return $.ajax({
      url: "/api/wishlist/" + itemId,
      type: "DELETE"
    });
  }
};

function addToWishList(itemId) {
  if (sessionStorage.email) {
    var wishlist = {
      email: sessionStorage.email,
      items: itemId
    };
    wishListAPI.saveToWishList(wishlist).then(function () {
      swal("Added to your wishlist.", "", "success");
      return;
    }).catch(function (err) {
      if (err.responseJSON.trim() == "items must be unique") {
        swal("It's already on your wishlist.", "", "warning");
        return;
      }
    });
  } else {
    swal("Is't that a pretty item..", "Please login and add to wishlist.", "error");
    return;
  }
}

function removeFromWishList(itemId) {
  wishListAPI.deleteFromWishList(itemId).then(function () {
    window.location.href="/wishlist";
    swal("Removed from your wishlist.", "", "success");

  });
}