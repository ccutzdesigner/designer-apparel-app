$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    if(data.firstName!=undefined){
      if(data.admin){
        $("#menu").append("<li><a href='/'>Home</a></li>");
        $("#menu").append("<li><a href='/admin'>Admin</a></li>");
      }
      $("#menu").append("<li><a href='/logout'>Logout</a></li>");
      $(".member-name").html(data.firstName);
      $("#login-id").hide();
    }
  });
});
