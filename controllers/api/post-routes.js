const router = require('express').Router();
const { Post, User } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'weight',
        'blood_pressure',
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  
  });

  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'weight',
        'blood_pressure',
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
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

  router.post('/', (req, res) => {
    
    Post.create({
      weight: req.body.weight,
      blood_pressure: req.body.blood_pressure,
      heart_rate: req.body.heart_rate,
      exercise_duration: req.body.exercise_duration,
      exercise_type: req.body.exercise_type,
      water_consumed: req.body.water_consumed,
      comments: req.body.comments,
      user_id: req.body.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  
  router.put('/:id', (req, res) => {
    Post.update(
      {
        weight: req.body.weight,
        blood_pressure: req.body.blood_pressure,
        heart_rate: req.body.heart_rate,
        exercise_duration: req.body.exercise_duration,
        exercise_type: req.body.exercise_type,
        water_consumed: req.body.water_consumed,
        comments: req.body.comments,
        user_id: req.body.user_id
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;