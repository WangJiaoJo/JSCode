var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

const data = require("../data");
const users = data.users;

module.exports = function(passport){
    passport.serializeUser(function (user, done){
        done(null, user);
    });

    passport.deserializeUser(function (user, done){
        done(null, user);
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    /*
        function(username, password, done){
            users.checkLogin(username, password).then((user) => {
                return done(null, user);
            }).catch((err) => {
                return done(null, false, {message: err});
            });
        }
    */
    
        function(req, username, password, done) {

            users.getUser(username).then((user) => {
                bcrypt.compare(password, user.password, function (err, res) {
                    if (err)
                        return Promise.reject("Error");
                    else {
                        if (res === true)
                            return done(null, user);
                        else
                            return done(null, false, req.flash('loginMessage', 'Password Not Match'));
                    }
                });
            }).catch((error) => {
                console.log(error);
                return done(null, false, req.flash('loginMessage', 'No user found'));
            });
        }
        
    ));
}