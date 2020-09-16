const { User } = require("../models");
const router = require('express').Router();
const sequelize = require('../config/connection');


  // User Home Redirect
  router.get('/', (req,res)=> {
    User.findAll({
        where: {
            user_id: req.session.id
          },
        attributes: ['admin']
      })
      .then(adminUser => {
          res.render('dashboard')


      })
    });

    module.exports=router;