
var $seasonName = $("#season-name");
var $seasonsSubmit = $("#seasons-submit");
var $seasonList = $("#season-list");


// The API object contains methods for each kind of request we'll make
var seasonAPI = {
  saveSeason: function (season) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/season",
      data: JSON.stringify(season)
    });
  },
  getSeasons: function () {
    return $.ajax({
      url: "api/seasons",
      type: "GET"
    });
  },
  deleteSeason: function (id) {
    return $.ajax({
      url: "api/season/" + id,
      type: "DELETE"
    });
  }
};

//refresh seasons
var refreshSeasons = function () {
  seasonAPI.getSeasons().then(function (data) {
    var $seasons = data.map(function (season) {

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": season.id
        }).text(season.name);
        

      var $button = $("<button>")
        .addClass("cz-btn float-right season-delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $seasonList.empty();
    $seasonList.append($seasons);
  });
};

//save season
var saveSeason = function (event) {
  event.preventDefault();

  var season = {
    name: $seasonName.val().trim()
  };

  if (!(season.name)) {
    swal("","You must enter a season name.","error");
    return;
  }

  seasonAPI.saveSeason(season).then(function () {
    refreshSeasons();
  });

  $seasonName.val("");
};

var deleteSeason = function () {
  var idToDelete = $(this).attr("data-id");

  seasonAPI.deleteSeason(idToDelete).then(function () {
    refreshSeasons();
  });
};

// Add event listeners to the submit and delete buttons
$seasonsSubmit.on("click", saveSeason);
$seasonList.on("click", ".season-delete", deleteSeason);