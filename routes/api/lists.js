const express = require('express');
const list = require('../../models/list');
const router = express.Router();

// Item Model
const List = require('../../models/list');

// @route   GET /lists
// @desc    Get all lists
// @access  Public
router.get('/', (req, res) =>{
    List.find()
        .sort({date: -1})
        .then(lists => res.json(lists))
});








module.exports = router;