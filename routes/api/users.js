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
    /*User.find()
        .sort({date: -1})
        .then(users => res.json(users))*/
    
    try {
        const userPage = await getUsers();
        console.log("user page: ", userPage)
        res.status(200).send(userPage);
    } catch (err) {
        console.log("-- error: ", err);
        res.status(500).send({
            error: "Error Fetching users page."
        });
    }
});

async function getUsers(){
    const users = await User.find()
        .sort({date: -1});

    return users;
}

// @route   POST /users
// @desc    Create a User
// @access  Public
router.post('/', (req, res) =>{
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    

    newUser.save()
        .then(user => res.json(user));

    const newList = new List({
        userId: newUser._id,
        list: []
    });

    newList.save().catch(err => console.log(err));
    console.log("== New User, List: ", newUser, newList)
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