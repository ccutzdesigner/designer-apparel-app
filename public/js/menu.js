
var $seasonsList = $("#seasons-list");
var $typesList = $("#types-list");
var $materialsList = $("#materials-list");
// loadFilters gets new items from the db and repopulates the list
var loadFilters = function () {
  API.getSeasons().then(function (data) {
    var $seasons = data.map(function (season) {
      var $a = $("<a>")
        .text(season.name)
        .addClass("dropdown-item")
        .attr("href", "/season/" + season.name);

      return $a;
    });

    $seasonsList.empty();
    $seasonsList.append($seasons);
  });

  API.getTypes().then(function (data) {
    var $types = data.map(function (type) {
      var $a = $("<a>")
        .text(type.name)
        .addClass("dropdown-item")
        .attr("href", "/type/" + type.name);

      return $a;
    });

    $typesList.empty();
    $typesList.append($types);
  });

  API.getMaterials().then(function (data) {
    var $materials = data.map(function (material) {
      var $a = $("<a>")
        .text(material.name)
        .addClass("dropdown-item")
        .attr("href", "/material/" + material.name);

      return $a;
    });

    $materialsList.empty();
    $materialsList.append($materials);
  });
};

$(document).ready(function(){
    loadFilters();
});
