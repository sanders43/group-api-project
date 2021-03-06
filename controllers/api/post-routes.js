const router = require('express').Router();
const { Post, User } = require('../../models');




router.get('/', (req, res) => {
    console.log('======================');
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
          attributes: ['id', 'first_name', 'last_name', 'height_feet', 'height_inches']
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
          attributes: ['id', 'first_name', 'last_name', 'height_feet', 'height_inches']
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

  router.get('/user/:id', (req, res) => {
    console.log('======================');
    Post.findAll({
       where: {
            user_id: req.session.user_id
        },
      order: [['created_at']],
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
          attributes: ['id', 'first_name', 'last_name', 'height_feet', 'height_inches']
        }
      ]
     })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  
  });
  

  router.post('/', (req, res) => {
    
    Post.create({
      weight: req.body.weight,
      bmi: req.body.bmi,
      systolic_blood_pressure: req.body.systolic_blood_pressure,
      diastolic_blood_pressure: req.body.diastolic_blood_pressure,
      heart_rate: req.body.heart_rate,
      exercise_duration: req.body.exercise_duration,
      exercise_type: req.body.exercise_type,
      water_consumed: req.body.water_consumed,
      emoji_feeling: req.body.emoji_feeling,
      comments: req.body.comments,
      user_id: req.session.user_id
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
        bmi: req.body.bmi,
        systolic_blood_pressure: req.body.systolic_blood_pressure,
        diastolic_blood_pressure: req.body.diastolic_blood_pressure,
        heart_rate: req.body.heart_rate,
        exercise_duration: req.body.exercise_duration,
        exercise_type: req.body.exercise_type,
        water_consumed: req.body.water_consumed,
        emoji_feeling: req.body.emoji_feeling,
        comments: req.body.comments,
        user_id: req.session.user_id
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