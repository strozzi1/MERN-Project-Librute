const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/lists', require('./lists'));


module.exports = router;