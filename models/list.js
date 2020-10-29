const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create schema

const listSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    list: {
        type: Array
    }

});

module.exports = List = mongoose.model('list', listSchema);


