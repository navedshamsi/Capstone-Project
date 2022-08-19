const mongoose = require("mongoose")
const schema = mongoose.Schema

const userschema = new schema({
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    }
})


const usermodel = mongoose.model("user model",userschema)

module.exports = usermodel