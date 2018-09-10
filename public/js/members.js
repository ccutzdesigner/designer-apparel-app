$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    if(data.firstName!=undefined){
      if(data.admin){

        $("#menu").append("<a class='dropdown-item' href='/'>Home</a>");
        $("#menu").append("<a class='dropdown-item' href='/admin'>Admin</a>");
      }
      $("#menu").append("<a class='dropdown-item' href='/logout'>Logout</a>");
      $(".member-name").html(" "+data.firstName+" "+data.lastName);
      $("#login-id").hide();
    }
  });
});
