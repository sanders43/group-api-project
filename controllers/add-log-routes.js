const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
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
            'emoji_feeling',
            'comments',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['first_name', 'last_name']
                // attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('add-log', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    console.log(req.session.user_id);
    console.log(req.params.id);


    Post.findOne({
        where: {
            // use the ID from the session
            // user_id: req.session.user_id
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
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {

            // serialize data before passing to template
            const post = dbPostData.get({ plain: true });

            console.log("title", post.title);
            console.log("post_text", post.post_text);

            res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;