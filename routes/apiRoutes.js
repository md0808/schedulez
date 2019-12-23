const db = require("../models");

module.exports = app => {
    app.get("/api/company/count/:name", (req, res) => {
        db.Company.count({
            where: {
                Name: req.params.name
            }
        }).then(count => {
            res.json(count);
        });
    });
    app.get("/api/company/find/:name", (req, res) => {
        db.Company.findOne({
            where: {
                Name: req.params.name
            }
        }).then((data) => {
            res.json(data);
        });
    });
    app.get("/api/location/find/:city", (req, res) => {
        db.Location.findOne({
            where: {
                City: req.params.city
            }
        }).then((data) => {
            res.json(data);
        });
    });
    app.get("/api/allEmployees", function (req, res) {
        db.dbEmployees.findAll({}).then(function (dbEmployees) {
            res.json(dbEmployees);
        });
    });
  app.get("/api/allEmployees/:locationNum", (req, res) => {
    db.Employee.findAll({
      where: {
        locationNum: req.params.locationNum
      },
      include: [db.Availability]
    }).then(dbEmployees => {
      res.json(dbEmployees);
    });
  });
    app.get("/api/allRequests", function (req, res) {
        db.dbRequests.findAll({}).then(function (dbRequests) {
            res.json(dbRequests);
        });
    });
    app.get("/api/allLocations/:company", (req, res) => {
        db.Location.findAll({
            where: {
                CompanyNum: req.params.company
             },
            include: [db.Company]
        }).then((data) => {
            res.json(data)
        })
    });

    // Create a new example
    app.post("/api/examples", (req, res) => {
        db.Example.create(req.body).then((dbExample) => {
            res.json(dbExample);
        });
    });
    app.post("/api/newCompany", (req, res) => {
        db.Company.create(req.body).then((dbCompany) => {
            res.json(dbCompany);
        });
    });
    app.post("/api/newLocation", (req, res) => {
        db.Location.create(req.body).then((dbLocation) => {
            res.json(dbLocation);
        });
    });
    app.post("/api/newEmployee", (req, res) => {
        db.Employee.create(req.body).then((dbEmployee) => {
            res.json(dbEmployee);
        });
    });
    
    // Delete an example by id
    app.delete("/api/examples/:id", function (req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
            res.json(dbExample);
        });
    });
};