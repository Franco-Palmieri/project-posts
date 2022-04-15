const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = mongoose.Schema({

    _userId: {
        type: String,
        userID:[
            {type: Schema.Types.ObjectId, ref: 'User'}
        ]
    },

    title: {
        type: String,
        required: true
    },
    
    body: {
        type: String,
        require: true
    },
})
module.exports = mongoose.model('Post', PostSchema)