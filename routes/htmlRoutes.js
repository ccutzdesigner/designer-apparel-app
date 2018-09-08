var db = require("../models");
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  // Load index page
  app.get("/items", function (req, res) {
    db.items.findAll({}).then(function (dbItems) {
      //console.log(dbItems);
      if (req.user.admin) {
        res.render("items", {
          title: "Items",
          items: dbItems
        });
      }
     
    });
  });

    // Load 
    app.get("/seasons", function (req, res) {
      db.seasons.findAll({}).then(function (dbItems) {
        //console.log(dbItems);
        if (req.user) {
          res.render("seasons", {
            title: "Seasons",
            seasons: dbItems
          });
        }
       
      });
    });
    
    //loading materials
    app.get("/materials", function (req, res) {
      db.materials.findAll({}).then(function (dbItems) {
        //console.log(dbItems);
        if (req.user) {
          res.render("materials", {
            title: "Materials",
            materials: dbItems
          });
        }
       
      });
    });

    app.get("/types", function (req, res) {
      db.types.findAll({}).then(function (dbItems) {
        //console.log(dbItems);
        if (req.user) {
          res.render("types", {
            title: "types",
            types: dbItems
          });
        }
       
      });
    });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup", {});
    //res.sendFile(path.join(__dirname, "../signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login", {});
//    res.sendFile(path.join(__dirname, "../login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    //res.sendFile(path.join(__dirname, "../members.html"));
    res.redirect("/all");
  });
  
  // Load index page
  app.get("/", function (req, res) {
    db.items.findAll().then(function (dbItems) {
      res.render("index", {
        items: dbItems
      });
    });
  });

    // Load index page
    app.get("/all", function (req, res) {
      db.items.findAll().then(function (dbItems) {
        res.render("all", {
          items: dbItems
        });
      });
    });

    // Load all items page
    app.get("/season/:season", function (req, res) {
      db.items.findAll({ where: { season: req.params.season } }).then(function (dbItems) {
        res.render("season", {
          items: dbItems
        });
      });
    });

  // Load item page and pass in an item by id
  app.get("/item/:id", function (req, res) {
    db.items.findOne({ where: { id: req.params.id } }).then(function (dbItem) {
      
      res.render("item", {
        item: dbItem 
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
