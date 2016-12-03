module.exports = function (app, passport) {  
    // Show the home page with log in form.
    app.get('/', function (req, res) {
        res.render('pages/login', {message: req.flash('loginMessage')});
    });

    app.get('/private', isLoggedIn, function(req, res) {
        res.render('pages/private', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/private',
        failureRedirect: '/',
        failureFlash: true
    }));

    app.use("*", (req, res) => {
        res.status(404).json({error: "Unvalie Symbol Not Found"});
    });
}

// Using route middleware, we can protect the private profile section route.
    function isLoggedIn(req, res, next) {
        //if user is authenticated in the session, carry on
        if(req.isAuthenticated())
            return next();
        else 
            res.redirect('/');
    }






















// const privateRoutes = require("./private");

// const constructorMethod = (app) => {
//     app.use("/private", privateRoutes);

//     app.get("/", function (request, response) {
//         response.render("pages/login");
//     });

//     app.use("*", (request, response) => {
//         response.sendStatus(404);
//     })
// };

// module.exports = constructorMethod;