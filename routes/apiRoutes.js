var db = require("../models");

module.exports = function(app) {
  // Get all items
  app.get("/api/items", function(req, res) {
    db.items.findAll({}).then(function(dbItems) {
      res.json(dbItems);
    });
  });

    // Get all items
    app.get("/api/items/:id", function(req, res) {
      db.items.findOne({ where: { id: req.params.id } }).then(function(dbItem) {
        res.json(dbItem);
      });
    });

  // Create a new item
  app.post("/api/item", function(req, res) {
    db.items.create(req.body).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // Delete an item by id
  app.delete("/api/item/:id", function(req, res) {
    db.items.destroy({ where: { id: req.params.id } }).then(function(dbItem) {
      res.json(dbItem);
    });
  });
};
