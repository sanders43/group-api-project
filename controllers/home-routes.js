const router = require("express").Router();
const sequelize = require('../config/connection')
const { User, Post, } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session.admin);
  if(req.session.admin) {
    res.redirect('/admin');
  } else {
    res.redirect('/dashboard');
  }
})

// Login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// Edit-Profile
router.get('/edit-profile', (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
  
  res.render('edit-profile');
  });
  
  // Add-Log
router.get('/add-log/:id', (req, res) => {
  if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
    };
  
    res.render('add-log');
  });
module.exports = router;