const { append } = require('express/lib/response')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://cftool_admin:loremipsum@cluster0.mrsp3.mongodb.net/cftool')
.then(()=>{
    console.log('mongo connected!')
},(err)=>{
    console.log(err)
})
.catch((err)=>{
    console.log(`not connected due to ${err}`)
})


