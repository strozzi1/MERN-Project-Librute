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


// @route   POST /users
// @desc    Create a User
// @access  Public
router.post('/', async (req, res) =>{
    if(!req.body.username && !req.body.password) res.status(500).json({message: "Need usrnm & pswd"})
    
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    try {
        const insertUser = await newUser.save();
        if(!insertUser) throw Error('Something went wrong saving a user');

        try{
            const newList = new List({
                userId: newUser._id,
                list: []
            });

            const insertList = await newList.save();
            if(!insertList) throw Error('Something went wrong adding list to user')

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
    /*newUser.save()
        .then(user => res.json(user));

    const newList = new List({
        userId: newUser._id,
        list: []
    });

    newList.save().catch(err => console.log(err));
    console.log("== New User, List: ", newUser, newList)*/
});

// @route   DELETE /users/:id
// @desc    Delete a User
// @access  Public
router.delete('/:id', (req, res) =>{
    User.findById(req.params.id)
        .then(user => user.remove()
            .then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
    
    

    
});



module.exports = router;