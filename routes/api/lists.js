const express = require('express');
const list = require('../../models/list');
const router = express.Router();

// Item Model
const List = require('../../models/list');

// @route   GET /lists
// @desc    Get all lists
// @access  Public
router.get('/', async (req, res) =>{
    
    
    try {
        const lists = await List.find()
            .sort({date: -1});
        if (!lists) throw Error('No items');
    
        res.status(200).json(lists);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});





module.exports = router;