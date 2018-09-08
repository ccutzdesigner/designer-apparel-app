
var $materialsName = $("#material-name");
var $materialsSubmit = $("#materials-submit");
var $materialsList = $("#materials-list");


// The API object contains methods for each kind of request we'll make
var materialAPI = {
  saveMaterial: function (material) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/material",
      data: JSON.stringify(material)
    });
  },
  getMaterials: function () {
    return $.ajax({
      url: "api/materials",
      type: "GET"
    });
  },
  deleteMaterial: function (id) {
    return $.ajax({
      url: "api/materials/" + id,
      type: "DELETE"
    });
  }
};

//refresh materials
var refreshMaterials = function () {
  materialAPI.getMaterials().then(function (data) {
    var $material = data.map(function (material) {
      

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": material.id
        })
        .text(material.name);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right material-delete")
        .attr("data-id",material.id)
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $materialsList.empty();
    $materialsList.append($material);
  });
};

//save material
var saveMaterial = function (event) {
  event.preventDefault();

  var material = {
    name: $materialsName.val().trim()
  };

  materialAPI.saveMaterial(material).then(function () {
    refreshMaterials();
  });


  if (!(material.name)) {
    alert("You must enter a name!");
    return;
  }
  $materialsName.val("");
};

var deleteMaterial = function () {
  var idToDelete = $(this).attr("data-id");

  materialAPI.deleteMaterial(idToDelete).then(function () {
    refreshMaterials();
  });
};

// Add event listeners to the submit and delete buttons
$materialsSubmit.on("click", saveMaterial);
$materialsList.on("click", ".material-delete", deleteMaterial);