//const loginRoutes = require("./login");

module.exports = function (app, passport) {
    //app.use("/login", loginRoutes);
    
    app.get('/', function (req, res) {
        res.render('login', {message: req.flash('loginMessage')});
    });

    app.get('/private', isLoggedIn, function(req, res) {
        res.render('private', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/private',
        failureRedirect: '/',
        failureFlash: true
    }));
    
    app.use("*", (req, res) => {
        res.sendStatus(400);
    });
};

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

//module.exports = constructorMethod;