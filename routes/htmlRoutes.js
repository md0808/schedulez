const db = require("../models");
const fetch = require("isomorphic-unfetch");

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

  // REAL WORLD
  // LogIn --> User Info (location#) --> Locations# --> Company # --> .get(/api/allLocations/:companyNum)

  // TESTING
  // enter url w/ companyName --> company # --> .get(/api/allLocations)

  app.get("/test/:name", (req, res) => {
    const url = `http://localhost:3000/api/company/find/${req.params.name}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        const userCompanyId = data.id;
        const url2 = `http://localhost:3000/api/allLocations/${userCompanyId}`;
        fetch(url2)
          .then(res2 => res2.json())
          .then(locations => {
            console.log(locations);
            res.render("managerView", { locations });
          });
      });
  });
  
    // $.get("/api/company/find/" + req.params.name, data => {
    //   res.json(data);
    // });

  // app.get("/testing/:name", (req, res) => {
  //   console.log(req.params.companyNum);
  //   $.get("/api/company/find/" + req.params.company-name, (data) => {
  //     const userCompanyId = data.id;
  //     console.log(userCompanyId); 
  //   }).then(() => {
  //         const userCompanyId = data.id;
  //         $.get("/api/allLocations/" + userCompanyId, (data) => {
  //           res.render("mangerView", {data})
  //         });
  //       }
  //     );

  app.get("/employee-view", (req, res) => {
    res.render("employeeView");
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
