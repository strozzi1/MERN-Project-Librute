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

