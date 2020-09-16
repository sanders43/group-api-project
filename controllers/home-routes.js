const router = require('express').Router();
const sequelize = require('../config/connection')
const { Post, User, } = require('../models')

const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  // console.log(req.session);
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
      'created_at',
      'user_id'
    ],
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name', 'height_feet', 'height_inches']
      }
    ]
  })
    .then(dbPostData => {
      // console.log("@#$!!!!!!!!!!!!!!!!!!")
      // console.log(req.session.user_id);
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render('homepage', {
        user_id: req.session.user_id,
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// Login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Add-Log
router.get('/add-log/:id', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  };

  res.render('add-log', {
    user_id: req.session.user_id,
    loggedIn: req.session.loggedIn
  });
});

// Profile
router.get('/profile', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  };

  User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: [
      'id',
      'first_name',
      'last_name',
      'email',
      'password',
      'gender',
      'height_feet',
      'height_inches',
      'birthday'
    ],
  })

    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }

      // serialize the data
      const user = dbUserData.get({ plain: true });

      // pass data to template
      res.render('profile', {
        user_id: req.session.user_id,
        user,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Edit-Profile
router.get('/edit-profile', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  res.render('edit-profile', {
    user_id: req.session.user_id,
    posts,
    loggedIn: req.session.loggedIn
  });
});

// GET single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
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
      'created_at',
      'user_id'
    ],
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', {
        user_id: req.session.user_id,
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;