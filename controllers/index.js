const router = require('express').Router();

const apiRoutes = require('./api');

const adminRoutes = require('./admin-routes.js')
const dashboardRoutes = require('./dashboard-routes');
const homeRoutes = require('./home-routes');

router.use('/', dashboardRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/admin', adminRoutes)

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;