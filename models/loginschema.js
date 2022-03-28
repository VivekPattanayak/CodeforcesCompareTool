const mongoose = require('mongoose')

const formschema =  new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Register = new mongoose.model("userdetail",formschema)

module.exports = Register