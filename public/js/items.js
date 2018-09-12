// Get references to page elements
var $itemName = $("#item-name");
var $itemDescription = $("#item-description");
var $itemPrice = $("#item-price");
var $itemType = $("#item-type");
var $itemMaterial = $("#item-material");
var $itemColors = $("#item-colors");
var $itemSeasons = $("#item-seasons");
var $itemPic = $("#item-pic");

var $submitBtn = $("#submit");
var $itemList = $("#item-list");


// The API object contains methods for each kind of request we'll make
var itemAPI = {
  saveItem: function (item) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/item",
      data: JSON.stringify(item)
    });
  },
  getItems: function () {
    return $.ajax({
      url: "api/items",
      type: "GET"
    });
  },
  deleteItem: function (id) {
    return $.ajax({
      url: "api/item/" + id,
      type: "DELETE"
    });
  }
};

// refreshItems gets new items from the db and repopulates the list
var refreshItems = function () {
  itemAPI.getItems().then(function (data) {
    var $items = data.map(function (item) {
      var $a = $("<a>")
        .html("<img src='"+item.pic+"' width='150' height='150'><span class='caption'>"+item.name+"</span>")
        .attr("href", "/item/" + item.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item"
        })
        .append($a);

      var $button = $("<button>")
        .addClass("cz-btn float-right delete")
        .attr("data-id", item.id)
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $itemList.empty();
    $itemList.append($items);
  });
};

// handleFormSubmit is called whenever we submit a new item
// Save the new item to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var itempic = document.getElementById("item-pic").files[0];
  //var fileName = document.getElementById("item-pic").files[0].name;
  if(!itempic){
    swal("", "Please upload a pic.", "error");
    return;
  }

  let file = new File([itempic], itempic, { "type": "image/jpg" });
  var reader = new FileReader();


  var dataURL = "";
  var item = {
    name: $itemName.val().trim(),
    description: $itemDescription.val().trim(),
    type: $itemType.val().trim(),
    material: $itemMaterial.val().trim(),
    color: $itemColors.val().trim(),
    season: $itemSeasons.val().trim(),
    price: $itemPrice.val().trim(),
    pic: dataURL
  };

  if (item.name == "") {
    swal("", "Please enter item name.", "error");
    return;
  }

  reader.onload = function () {
    dataURL = reader.result;
    item.pic = dataURL;
    itemAPI.saveItem(item).then(function () {
      refreshItems();
    });
  };
    reader.readAsDataURL(file);


  $itemName.val("");
  $itemDescription.val("");
  $itemPrice.val("");
  $itemType.val("");
  $itemMaterial.val("");
  $itemColors.val("");
  $itemSeasons.val("");
  $itemPic.val("");
};

// handleDeleteBtnClick is called when an item's delete button is clicked
// Remove the item from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this).attr("data-id");

  itemAPI.deleteItem(idToDelete).then(function () {
    refreshItems();
  });
};


// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$itemList.on("click", ".delete", handleDeleteBtnClick);

