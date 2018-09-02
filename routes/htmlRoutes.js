var db = require("../models");

module.exports = function(app) {
  
  // Load index page
  app.get("/admin", function(req, res) {
    db.items.findAll({}).then(function(dbItems) {
      console.log(dbItems);
      res.render("admin", {
        msg: "Welcome Admin!",
        items: dbItems
      });
    });
  });

    // Load index page
    app.get("/", function(req, res) {
      db.items.findAll().then(function(dbItems) {
        res.render("index", {
          items: dbItems
        });
      });
    });

  // Load item page and pass in an item by id
  app.get("/item/:id", function(req, res) {
    db.items.findOne({ where: { id: req.params.id } }).then(function(dbItem) {
      res.render("item", {
        item: dbItem
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
