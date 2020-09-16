const router = require('express').Router();

const apiRoutes = require('./api');

const adminRoutes = require('./admin-routes.js')

router.use('/api', apiRoutes);
router.use('/', adminRoutes)

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;