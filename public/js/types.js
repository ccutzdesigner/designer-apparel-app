var $typesName = $("#types-name");
var $typesSubmit = $("#types-submit");
var $typesList = $("#types-list");


// The API object contains methods for each kind of request we'll make
var typesAPI = {
  savetypes: function (types) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/types",
      data: JSON.stringify(types)
    });
  },
  gettypes: function () {
    return $.ajax({
      url: "api/types",
      type: "GET"
    });
  },
  deletetypes: function (id) {
    return $.ajax({
      url: "api/types/" + id,
      type: "DELETE"
    });
  }
};

//refresh typess
var refreshtypes = function () {
  typesAPI.gettypes().then(function (data) {
    var $types = data.map(function (types) {
    
        

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": types.id
        }).text(types.name);
        

      var $button = $("<button>")
        .addClass("btn btn-danger float-right types-delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $typesList.empty();
    $typesList.append($types);
  });
};

//save types
var savetypes = function (event) {
  event.preventDefault();

  var types = {
    name: $typesName.val().trim()
  };

  typesAPI.savetypes(types).then(function () {
    refreshtypes();
  });


  if (!(types.name)) {
    alert("You must enter a name!");
    return;
  }
  $typesName.val("");
};

var deletetypes = function () {
  var idToDelete = $(this).attr("data-id");

  typesAPI.deletetypes(idToDelete).then(function () {
    refreshtypes();
  });
};

// Add event listeners to the submit and delete buttons
$typesSubmit.on("click", savetypes);
$typesList.on("click", ".types-delete", deletetypes);