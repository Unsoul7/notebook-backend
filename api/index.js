const express = require('express')
const app = express()
let PORT = 5000
app.use(express.json())

app.use('/auth',require('./routes/auth'))
app.use('/note',require('./routes/notes'))

app.listen(PORT,(req,res) => {
   console.log('Server started')
})

