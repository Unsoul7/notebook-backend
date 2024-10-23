const express = require('express')
const router = express.Router()
const Note = require('../schema/Note')
const User = require('../schema/User')

router.post('/create', async (req,res) => {

    const {email,title,note} = req.body
    const createdNote = await Note.create({
        title,
        note
    }) 

    const findUser = await User.findOne({email})
    await findUser.notes.push(createdNote._id)
    
    createdNote.user = findUser._id
    await findUser.save()
    await createdNote.save()

    res.send('done')
})

module.exports = router