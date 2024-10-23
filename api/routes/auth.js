const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const User = require('../schema/User')

router.post('/register', async (req, res) => {
    const { fullname, email, password } = req.body
    let salt = await bcryptjs.genSalt(10)
    let hash = await bcryptjs.hash(password, salt)

    try {
        const createUser = await User.create({
            fullname, email, password: hash
        })
        await createUser.save()
        return res.status(200).send(createUser)
    }
    catch (err) {
        return res.status(503).json(err)
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const findUser = await User.findOne({email})
    
    if(!findUser){
        console.log('not found')
        return res.status(404).send('User Not Found')
    }
    
    const checkpass = await bcryptjs.compare(password,findUser.password)
    
    if(!checkpass){
        return res.status(401)
    }

    return res.status(200)
})

router.post('/forgetpass',async (req,res) => {

    const {email, password, newpassword} = req.body
    const finduser = await User.findOne({email})
    const checkpass = await bcryptjs.compare(password, finduser.password)
    
    if(!checkpass){
        return res.status(401).send('wrong pass')
    }
    const salt = await bcryptjs.genSalt(10)
    finduser.password = await bcryptjs.hash(newpassword,salt)
    await finduser.save()
    return res.send(finduser)
})



module.exports = router