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

  app.get("/create-store/", (req, res) => {
    res.render("newStore", {
      msg: "Create A Store!"
    });
  });

  app.get("/manager-view/", (req, res) => {
    res.render("managerView");
  });

  // REAL WORLD
  // LogIn --> User Info (location#) --> Locations# --> Company # --> .get(/api/allLocations/:companyNum)

  // TESTING
  // enter url w/ companyName --> company # --> .get(/api/allLocations)

  app.get("/manager-view/:name", (req, res) => {
    const url = `http://localhost:3000/api/company/find/${req.params.name}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        console.log(data);
        const userCompanyId = data.id;
        const url2 = `http://localhost:3000/api/allLocations/${userCompanyId}`;
        fetch(url2)
          .then(res2 => res2.json())
          .then(locations => {
            console.log(locations);
            var editedLocations = locations;

            // for (var i = 0; i < editedLocations.length; i++) {
            //   editedLocations[i].Company.CompanyNum = locations.CompanyNum;
            //   editedLocations[i].Company.Address = locations.Address;
            //   editedLocations[i].Company.City = locations.City;
            //   editedLocations[i].Company.State = locations.State;
            //   editedLocations[i].Company.Zipcode = locations.Zipcode;
            //   editedLocations[i].Company.Country = locations.Country;
            //   editedLocations[i].Company.OpeningTime = locations.OpeningTime;
            //   editedLocations[i].Company.ClosingTime = locations.ClosingTime;
            //   editedLocations[i].Company.CompanyId = locations.CompanyId;
            // }
            console.log(editedLocations);
            res.render("managerView", { editedLocations });
          });
      });
  });

  // ***************
  // dev note: need employee information to pass into here

  app.get("/manager-view/:employee", (req, res) => {
    const url = `http://localhost:3000/api/allEmployees/${req.params.id}`;
    fetch(url)
      .then(r => r.json())
      .then(employeeInfo => {
        console.log(employeeInfo);
        res.render("managerView", { employeeInfo });
      });
  });

  // ***************

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
