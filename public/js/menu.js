
var $seasonsList = $("#seasons-list");
var $typesList = $("#types-list");
var $materialsList = $("#materials-list");
// loadFilters gets new items from the db and repopulates the list
var loadFilters = function () {
  API.getSeasons().then(function (data) {
    var $seasons = data.map(function (season) {
      var $a = $("<a>")
        .text(season.name)
        .addClass("nav-link")
        .attr("href", "/season/" + season.name);

      var $li = $("<li>")
        .attr({
          class: "nav-item"
        })
        .append($a);
      return $li;
    });

    $seasonsList.empty();
    $seasonsList.append($seasons);
  });

  API.getTypes().then(function (data) {
    var $types = data.map(function (type) {
      var $a = $("<a>")
        .text(type.name)
        .addClass("nav-link")
        .attr("href", "/type/" + type.name);

      var $li = $("<li>")
        .attr({
          class: "nav-item"
        })
        .append($a);
      return $li;
    });

    $typesList.empty();
    $typesList.append($types);
  });

  API.getMaterials().then(function (data) {
    var $materials = data.map(function (material) {
      var $a = $("<a>")
        .text(material.name)
        .addClass("nav-link")
        .attr("href", "/material/" + material.name);

      var $li = $("<li>")
        .attr({
          class: "nav-item"
        })
        .append($a);
      return $li;
    });

    $materialsList.empty();
    $materialsList.append($materials);
  });
};

$(document).ready(function(){
    loadFilters();
});
