const router = require("express").Router();
const { User, Post, } = require('../../models');


// Get /api/users
router.get('/', (req,res)=> {
    User.findAll({
        attributes: { exclude: ['password'] }
      })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

//Get /api/users/1
router.get('/:id', (req,res)=> {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
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
        'comments',
        'created_at']
      }
    ]
  })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

//POST /api/users
router.post('/', (req,res)=> {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        height_feet: req.body.height_feet,
        height_inches: req.body.height_inches,
        birthday: req.body.birthday,
        admin: req.body.admin
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.email = dbUserData.email;
        req.session.heightInInches = (dbUserData.height_feet * 12) + dbUserData.height_inches;
        req.session.loggedIn = true;
    
        res.json(dbUserData);
      });
    })
    
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//login
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.email = dbUserData.email;
      req.session.heightInInches = (dbUserData.height_feet * 12) + dbUserData.height_inches;
      req.session.loggedIn = true;
      if(dbUserData.admin){
        req.session.admin = true;
      }

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }

});
    

// PUT /api/users/1
router.put("/:id", (req,res)=> {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1

router.delete("/:id", (req,res)=> {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;