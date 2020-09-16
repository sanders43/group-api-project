const router = require('express').Router();
const sequelize = require('../config/connection')
const { Post, User, } = require('../models')

const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  Post.findAll({
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'weight',
      'bmi',
      'systolic_blood_pressure',
      'diastolic_blood_pressure',
      'heart_rate',
      'exercise_duration',
      'exercise_type',
      'water_consumed',
      'emoji_feeling',
      'comments',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name', 'height_feet', 'height_inches', 'admin']
      }
    ]
  })
    .then(dbPostData => {
      console.log("@#$!!!!!!!!!!!!!!!!!!")
      console.log(req.session.user_id);
      console.log(req.session.admin);
      console.log(req.session.loggedIn);
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render('admin', {
        posts,
        loggedIn: req.session.loggedIn,
        admin: req.session.admin
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/admin');
    return;
  }

  res.render('login');
});

module.exports = router;