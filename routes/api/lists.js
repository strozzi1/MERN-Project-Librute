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
    
        res.status(200).send(lists);
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
        const bookInList = await List.findOne({
            userId: req.params.uid,
            list: {$elemMatch: {id: req.body.id}}
        });
        if(!bookInList){
            try{
                
                const addBook = await List.updateOne(
                    {userId: req.params.uid},
                    {$push: {list: req.body}});
                
                if(addBook) res.status(200).send(req.body);
            } catch(e){
                res.status(301).json({ msg: e.message });
            }
        } else throw Error("Book already in List")

    } catch(e){
        console.log("Post book 302: ", e)
        res.status(302).json({ msg: e.message });
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


// @route   delete /lists/userid
// @desc    delete book from list of user with uid
// @access  Public
router.delete('/:uid', async (req, res) =>{
    console.log("req.body.id delete: ", req.body);
    if(!req.body.id) res.status(301).json({msg: "No book id provided"});
    try{
        const removeBook = await List.updateOne(
            { userId: req.params.uid },
            //{ $pull: {'list.id': req.body.id}  },
            { $pull: {list: {'id': req.body.id} } },
            { safe: true, multi:false }
        );
        if(!removeBook) throw Error('Error removing book')
        res.status(200).json({id:req.body.id});
    }catch(e){
        res.status(500).json({ msg: e.message });
    }
})


// @route   delete /lists/userid/bookid
// @desc    delete book from list of user with uid
// @access  Public
router.delete('/:uid/:bookid', async (req, res) =>{
    
    //console.log("delete uid/bookid: ", req.params.uid, "/", req.params.bookid);
    try{
        const removeBook = await List.updateOne(
            {userId: req.params.uid},
            { $pull: {list: {'id': req.params.bookid} } },
            { safe: true, multi:false }
        );
        
        if(!removeBook) throw Error('Error removing book')
        res.status(200).json({id:req.params.bookid});
    }catch(e){
        res.status(500).json({ msg: e.message });
    }
})

module.exports = router;