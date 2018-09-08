$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    if(data.firstName!=undefined){
      if(data.admin){
        $("#menu").append("<li><a href='/items'>Add Items</a></li>");
        $("#menu").append("<li><a href='/materials'>Add Materials</a></li>");
        $("#menu").append("<li><a href='/types'>Add Types</a></li>");
        $("#menu").append("<li><a href='/seasons'>Add Seasons</a></li>");
      }
      $("#menu").append("<li><a href='/logout'>Logout</a></li>");
      $(".member-name").html(data.firstName+" "+data.lastName);
    }
  });
});
