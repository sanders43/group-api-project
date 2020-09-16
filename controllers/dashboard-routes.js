const router = require('express').Router();
<<<<<<< HEAD
const sequelize = require('../config/connection')
const { Post, User, } = require('../models')

const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    Post.findAll({
      order: [['created_at', 'DESC']],
      where: {
        // use the ID from the session
        user_id: req.session.user_id
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
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // pass a single post object into the homepage template
        res.render('dashboard', {
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
  

// GET single post
router.get('/post/:id', (req, res) => {
=======
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            id: req.params.id
          },
        attributes: [
          'id',
          'weight',
          'systolic_blood_pressure',
          'diastolic_blood_pressure',
          'heart_rate',
          'exercise_duration',
          'exercise_type',
          'water_consumed',
          'comments',
          'created_at'
        ],
        include: [
          {
            model: User,
            attributes: ['first_name', 'last_name']
          }
        ]
      })
    .then(dbPostData => {
      //serialize data before pass to template
      const posts = dbPostData.map(post => post.get({ plain: true}));
      res.render('admin', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.get('/post/:id', (req, res) => {
>>>>>>> feature/admin
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'weight',
<<<<<<< HEAD
        'bmi',
=======
>>>>>>> feature/admin
        'systolic_blood_pressure',
        'diastolic_blood_pressure',
        'heart_rate',
        'exercise_duration',
        'exercise_type',
        'water_consumed',
<<<<<<< HEAD
        'emoji_feeling',
        'comments',
        'created_at',
        'user_id'
=======
        'comments',
        'created_at'
>>>>>>> feature/admin
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
          post,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
<<<<<<< HEAD
  
=======

>>>>>>> feature/admin
  module.exports = router;