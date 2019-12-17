const db = require("../models");

module.exports = app => {
  // Load index page
  app.get("/", (req, res) => {
    res.render("login", {
      msg: "Welcome!"
      // examples: dbExamples
    });

    // db.Example.findAll({}).then(function(dbExamples) {
    // });
  });

  app.get("/create-store", (req, res) => {
    res.render("newStore", {
      msg: "Create A Store!"
    });
  });

  const locations = [
    {
      locationNum: 10,
      companyNum: 12,
      address: "pickles",
      city: "pickles",
      state: "pickles",
      openingTime: "pickles",
      closingTime: "pickles"
    },
    {
      locationNum: 11,
      companyNum: 13,
      address: "test",
      city: "test",
      state: "test",
      openingTime: "test",
      closingTime: "test"
    }
  ];

  app.get("/manager-view", (req, res) => {
    res.render("managerView", { locations });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", (req, res) => {
    db.Example.findOne({ where: { id: req.params.id } }).then(dbExample => {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
