var authController = require("../controllers/authcontroller");


module.exports = function(app, passport) {

    app.get('/newStore', authController.newStore);


    app.get('/login', authController.login);


    app.post('/newStore', passport.authenticate('local-signup', {
            successRedirect: '/managerView',

            failureRedirect: '/'
        }

    ));



}