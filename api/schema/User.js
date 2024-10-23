const mongoose = require('mongoose')
const DBURI = 'mongodb+srv://amanforsure:aman9811@cluster0.kfhzv.mongodb.net/test'
mongoose.connect(DBURI)

const userSchema = new mongoose.Schema({
    fullname : {
        type : String
    },
    email :{
        type : String,
        unique : true
    },
    password : {
        type : String,
    },
    notes : [{
        type : mongoose.Schema.Types.ObjectId
    }]
})

module.exports = mongoose.model('User',userSchema)
