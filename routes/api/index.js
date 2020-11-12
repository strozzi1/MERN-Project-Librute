const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/lists', require('./lists'));
router.use('/google-books', require('./google-relay'));


module.exports = router;