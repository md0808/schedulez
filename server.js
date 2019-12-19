require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
// var env = require("dotenv").load();
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

//Models
var models = require("./models");
//Sync Database
models.sequelize
    .sync()
    .then(function() {
        console.log("Nice! Database looks fine");
    })
    .catch(function(err) {
        console.log(err, "Something went wrong with the Database Update!");
    });

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
// session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// create new user/password
// app.get("/", function(req, res) {
//     res.send("Welcome to Passport with Sequelize");
// });

// Handlebars
app.set("views", "./views");
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    })
);
app.set("view engine", "handlebars");
// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Routes
require("./routes/auth")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

module.exports = app;