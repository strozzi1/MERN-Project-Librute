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
        res.status(500).json({ msg: e.message });
    }
});

// @route   post /lists/userid
// @desc    add book to list
// @access  Public
router.post('/:uid', async (req, res) =>{
    //need to add tool for removing none schema objects
    
    //check if book is already in the list
    try{
        if(!req.body.title || !req.body.author || !req.body.genre || !req.body.id) throw Error('Missing data');
        const bookInList = await List.find({
            userId: req.params.uid,
            "list.id": req.body.title
        });
        if(!bookInList){
            try{
                
                const addBook = await List.update(
                    {userId: req.params.uid},
                    {$push: {list: req.body}});
                
                if(addBook) res.status(200).json({msg: userlist});
            } catch(e){
                res.status(300).json({ msg: e.message });
            }
        } else throw Error("Book already in List")

    } catch(e){
        res.status(300).json({ msg: e.message });
    }
    
});


// @route   GET /lists/uid
// @desc    Get list of user with uid
// @access  Public
router.get('/:uid', async (req, res) =>{

    try {
        const list = await List.findOne({userId: req.params.uid});
        if (!list) throw Error('No list');
    
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
});




module.exports = router;