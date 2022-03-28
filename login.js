const { append } = require('express/lib/response')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/cftooldetails')
.then(()=>{
    console.log('mongo connected!')
},(err)=>{
    console.log(err)
})
.catch((err)=>{
    console.log(`not connected due to ${err}`)
})


