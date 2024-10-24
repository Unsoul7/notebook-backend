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

router.post('/edit',async (req,res) => {

    const {noteid,newnote,title} = req.body
    const getnote = await Note.findOne({_id : noteid})
    
    try{

            newnote != "" ? getnote.note = newnote : ''
            title != "" ? getnote.title = title : ''
            await getnote.save()

        res.status(200).send('Note Update')
    }
    catch(err){
        res.status(404).send('Note not Found!')
    }
})



router.post('/delete',async (req,res) => {

    const {noteid} = req.body
    try{

        const getnote = await Note.findOneAndDelete({_id : noteid})
        res.status(200).send('deleted note!')
    }
    catch(err){
        res.status(404).send('Note Not Found')
    }
})

router.post('/getnote',async (req,res) => {
    const {noteid}  = req.body

    try{

        const getnote = await Note.findOne({_id : noteid})
        res.status(200).json(getnote)
    }
    catch(err){
        res.status(404).send('Note not Found')
    }

})

router.post('/allnote',async (req,res) => {
    const {email} = req.body

    try{
        const getusernotes = await User.findOne({email}).populate('notes')   
        res.status(200).json(getusernotes.notes)
    }
    catch(err){
        res.status(404).send('something went wrong')
    }
 })

module.exports = router