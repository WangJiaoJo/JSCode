/*
const express = require('express'); 
const router = express.Router();
const data = require("../data");
const users = data.users;
var passport = require('passport');

router.get("/", (req, res) => {
    
    if (req.isAuthenticated()){
        res.redirect('/private');
    } else {
        res.render("login", {error:req.flash().error});
    }
    
    res.render('login', {message: req.flash('loginMessage')});
});

router.post("/login", passport.authenticate('local',{
        successRedirect: '/private',
        failureRedirect: '/',
        failureFlash: true
    })
);

//router.all('/private', isLoggedIn);
router.get("/private", isLoggedIn, (req, res) => {
    res.render("private", {user: req.user});
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next;
    }
    res.redirect('/');
}

module.exports = router;
*/
