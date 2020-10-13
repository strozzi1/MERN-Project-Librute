const express = require('express');
const router = express.Router();

// Item Model
const User = require('../../models/user');
const List = require('../../models/list');
const { json } = require('express');

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) =>{
    
    
    try {
        const users = await User.find();
        if (!users) throw Error('No items');
    
        res.status(200).json(users);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});



// @route   GET api/users/username/animelist
// @desc    Get animelist of user by username
// @access  Public
router.get('/:username/animelist', async (req, res) =>{
    
    
    try {
        const user = await User.findOne({username: req.params.username});
        if (!user) throw Error('No user of that username found');
        
        try{
            const list = await List.findOne({userId: user._id});
            if(!list) throw Error('no list found for this user');
            res.status(200).json(list);
        }catch(err){
            res.status(400).json({ msg: e.message });
        }


        res.status(200).json(users);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});


// @route   POST /users
// @desc    Create a User, create a list with link to user
//          make sure username isn't taken
//
// @access  Public
router.post('/', async (req, res) =>{
    if(!req.body.email && !req.body.username && !req.body.password) res.status(500).json({message: "Need usrnm, pswd and email"})
    
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    //check if username is taken
    try{
        const usernameTaken = await User.findOne({username: req.body.username});
        if(usernameTaken) throw Error('Username was taken');
        // try to save new user
        try {
            const insertUser = await newUser.save();
            if(!insertUser) throw Error('Something went wrong saving a user');
            //try to add a list with userId of new user
            try{
                const newList = new List({
                    userId: newUser._id,
                    list: []
                });
                
                const insertList = await newList.save();
                if(!insertList) throw Error('Something went wrong adding list to user')
                //return status
                res.status(200).json({
                    user: insertUser,
                    list: insertList
                })
            } catch (err) {
                res.status(400).json({ msg: err.message });
            }
        } catch (err) {
            res.status(400).json({ msg: err.message });
        }

    }catch(err){
        res.status(400).json({ msg: err.message });
    }
    
    
    
});

// @route   DELETE /users/:id
// @desc    Delete a User
// @access  Public
router.delete('/:id', async (req, res) =>{
    /*User.findById(req.params.id)
        .then(user => user.remove()
            .then(() => res.json({success: true})))
      .catch(err => res.status(404).json({success: false}));*/

    try{
        const user = await User.findById({_id: req.params.id});
        if(!user) throw Error('No user was found with that id');
        console.log("-- user: ", user);
        const removedUser = await user.deleteOne();
        if(!removedUser) throw Error('Something went wrong with delete User');

        try {
            /*const list = await List.find({userId: req.params.id});
            if(!list) throw Error('Could not find list of user');
            console.log("-- List: ", list);*/
            const removeList =  await List.deleteMany({userId: req.params.id});
            if(!removeList) throw Error('Issue deleting list');

            res.status(200).json({success: true});
        }catch (err) {
            res.status(400).json({ msg: err.message });
        }

    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
    
});



// @route   GET /users/:username
// @desc    Get a User by username
// @access  Public
router.get('/:username', async (req, res) =>{

    try{
        const user = await User.findOne({username: req.params.username});
        if(!user) throw Error('No user was found with that username: ', username);
        res.status(200).json({user: user});
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
    
});



module.exports = router;