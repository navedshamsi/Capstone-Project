const mongoose = require("mongoose")
const schema = mongoose.Schema

const Userschema = new schema({
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    cart:[],
    wishlist:[]

})


const User = mongoose.model("user model",Userschema)

module.exports = User