const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title : {
        type : String,
        default : 'Untitled'
    },
    created : {
        type : Date,
        default : Date.now()
    },
    note : {
        type : String
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

module.exports = mongoose.model('Note',noteSchema)