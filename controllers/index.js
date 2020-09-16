const router = require('express').Router();

const apiRoutes = require('./api');

<<<<<<< HEAD
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes');
=======
const adminRoutes = require('./admin-routes.js')
>>>>>>> feature/admin

router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
<<<<<<< HEAD
router.use('/', homeRoutes);
=======
router.use('/', adminRoutes)
>>>>>>> feature/admin

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;