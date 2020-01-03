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
    app.get("/api/employee/find/:email/:password", (req, res) => {
        db.Employee.findOne({
            where: {
                Email: req.params.email,
                Password: req.params.password

            }
        }).then((data) => {
            res.json(data);
        });
    });
    app.get("/api/employee/find/:locationNum/:firstName/:lastName", (req, res) => {
        db.Employee.findOne({
            where: {
                locationNum: req.params.locationNum,
                FullName: req.params.firstName + " " + req.params.lastName
            }
        }).then((data) => {
            res.json(data);
        });
    });
    app.get("/api/allEmployees/:locationNum", (req, res) => {
        db.Employee.findAll({
            where: {
                locationNum: req.params.locationNum
            }
        }).then((dbEmployees) => {
            res.json(dbEmployees);
        });
    });
    app.get("/api/availability/:employeeNum", (req, res) => {
        db.Availability.findOne({
            where: {
                EmployeeNum: req.params.employeeNum
            }
        }).then((data) => {
            res.json(data);
        });
    });
    app.get("/api/employee/find/:employeeNum", (req, res) => {
        db.Employee.findOne({
            where: {
                id: req.params.employeeNum
            }
        }).then((data) => {
            res.json(data);
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
    app.get("/api/getSchedule/:locationNum", (req, res) => {
        db.Schedule.findOne({
            where: {
                LocationNum: req.params.locationNum
            }
        }).then((data) => {
            res.json(data);
        });
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
    app.post("/api/newAvailability", (req, res) => {
        db.Availability.create(req.body).then((dbAvailability) => {
            res.json(dbAvailability);
        });
    });
    app.post("/api/newSchedule", (req, res) => {
        db.Schedule.create(req.body).then((dbSchedule) => {
            res.json(dbSchedule);
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function (req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
            res.json(dbExample);
        });
    });
};