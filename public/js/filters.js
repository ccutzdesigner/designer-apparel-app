


// The API object contains methods for each kind of request we'll make
var API = {
  
  getSeasons: function () {
    return $.ajax({
      url: "/api/seasons",
      type: "GET"
    });
  },
  getTypes: function () {
    return $.ajax({
      url: "/api/types",
      type: "GET"
    });
  },
  getMaterials: function () {
    return $.ajax({
      url: "/api/materials",
      type: "GET"
    });
  }
  
};


