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

  app.get("/:storeNum/manager-view/", (req, res) => {
    res.render("managerView");
  });

  // REAL WORLD
  // LogIn --> User Info (location#) --> Locations# --> Company # --> .get(/api/allLocations/:companyNum)

  // Access Location Information
  app.get(":locationNum/manager-view/:name", (req, res) => {
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
            const editedLocations = locations;
            res.render("managerView", { editedLocations });
          });
      });
  });

  // app.get("/:locationNum/manager-view/:shiftNum", (req, res) => {
  //   var numOfShifts = parseInt(req.params.shiftNum);
  //   var shifts = [];

  //   for (var i = 0; i < numOfShifts; i++) {
  //     var num = i + 1;
  //     var shiftNum = { shiftnum: num };
  //     shifts.push(shiftNum);
  //   }

  //   res.render("managerView", { shifts });
  // });

  // VIEW EMPLOYEES
  app.get("/:locationNum/manager-view/employees", (req, res) => {
    const locationNumber = parseInt(req.params.locationNum);
    console.log(locationNumber);
    const url = `http://localhost:3000/api/allEmployees/${locationNumber}`;
    fetch(url)
      .then(r => r.json())
      .then(locationEmployees => {
        console.log(locationEmployees);
        res.render("managerView", { locationEmployees });
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
