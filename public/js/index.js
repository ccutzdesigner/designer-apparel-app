// Get references to page elements
var $itemName = $("#item-name");
var $itemDescription = $("#item-description");
var $itemPrice=$("#item-price");
var $itemType=$("#item-type");
var $itemMaterial=$("#item-material");
var $itemColors=$("#item-colors");
var $itemSeasons=$("#item-seasons");
var $submitBtn = $("#submit");
var $itemList = $("#item-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveItem: function(item) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/item",
      data: JSON.stringify(item)
    });
  },
  getItems: function() {
    return $.ajax({
      url: "api/items",
      type: "GET"
    });
  },
  deleteItem: function(id) {
    return $.ajax({
      url: "api/item/" + id,
      type: "DELETE"
    });
  }
};

// refreshItems gets new items from the db and repopulates the list
var refreshItems = function() {
  API.getItems().then(function(data) {
    var $items = data.map(function(item) {
      var $a = $("<a>")
        .text(item.name)
        .attr("href", "/item/" + item.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": item.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
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
var handleFormSubmit = function(event) {
  event.preventDefault();

  var item = {
    name: $itemName.val().trim(),
    description: $itemDescription.val().trim(),
    type:$itemType.val().trim(),
    material:$itemMaterial.val().trim(),
    color:$itemColors.val().trim(),
    season:$itemSeasons.val().trim(),
    price:$itemPrice.val().trim()
  };

  if (!(item.name)) {
    alert("You must enter an item name!");
    return;
  }

  API.saveItem(item).then(function() {
    refreshItems();
  });

  $itemName.val("");
  $itemDescription.val("");
  $itemPrice.val("");
  $itemType.val("");
  $itemMaterial.val("");
  $itemColors.val("");
  $itemSeasons.val("");

};

// handleDeleteBtnClick is called when an item's delete button is clicked
// Remove the item from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteItem(idToDelete).then(function() {
    refreshItems();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$itemList.on("click", ".delete", handleDeleteBtnClick);
