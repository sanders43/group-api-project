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

module.exports = router;