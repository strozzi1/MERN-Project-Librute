const mongoose = require('mongoose');
const List = require('./list')

const Schema = mongoose.Schema;

//create schema

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
    listId: {
        type: Schema.Types.ObjectId,
        required: false,
    }


});
module.exports = User = mongoose.model('user', userSchema);

async function removeUserAndList(userId){
    const users = await User.find()
        .sort({date: -1})
        .then(users => res.json(users));

    return users;
}
exports.removeUserAndList = removeUserAndList;


async function getUsers(){
    const users = await User.find()
        .sort({date: -1});

    return users;
}
exports.getUsers = getUsers;