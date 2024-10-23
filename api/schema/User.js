const mongoose = require('mongoose')
const DBURI = 'mongodb://localhost:27017/notefreak'
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
    }
})

module.exports = mongoose.model('User',userSchema)
