// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// add a basic route
app.get('/', function(req, res) {
    res.json({ message: 'Express is up!' });
});
// start the app
app.listen(3000, function() {
    console.log("Express is running on port 3000");
});