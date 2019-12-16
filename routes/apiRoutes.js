var db = require("../models");

module.exports = function(app) {
    // Get all examples
    app.get("/api/examples", function(req, res) {
        db.Example.findAll({}).then(function(dbExamples) {
            res.json(dbExamples);
        });
    });
    app.get("/api/company/:name", (req, res) => {
        db.Company.count({
            where: {Name: req.params.name}
        }).then(count => {
            res.json(count);
        });
    });
    app.get("/api/allEmployees", function(req, res) {
        db.dbEmployees.findAll({}).then(function(dbEmployees) {
            res.json(dbEmployees);
        });
    });
    app.get("/api/allEmployees/:id", function(req, res) {
        db.dbEmployees.findAll({}).then(function(dbEmployees) {
            res.json(dbEmployees);
        });
    });
    app.get("/api/allRequests", function(req, res) {
        db.dbRequests.findAll({}).then(function(dbRequests) {
            res.json(dbRequests);
        });
    });

    // Create a new example
    app.post("/api/examples", function(req, res) {
        db.Example.create(req.body).then(function(dbExample) {
            res.json(dbExample);
        });
    });
    app.post("/api/newCompany", function(req, res) {
        db.Company.create(req.body).then((dbCompany) => {
            res.json(dbCompany);
        });
    });
    app.post("/api/newLocation", function(req, res) {
        db.newLocation.create(req.body).then(function(dbnewLocation) {
            res.json(dbnewLocation);
        });
    });
    app.post("/api/newEmployee", function(req, res) {
        db.newEmployee.create(req.body).then(function(dbnewEmployee) {
            res.json(dbnewEmployee);
        });
    });


    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
            res.json(dbExample);
        });
    });
};