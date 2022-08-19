const mongoose = require("mongoose")
const schema = mongoose.Schema

const adminschema = new schema({
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


const adminmodel = mongoose.model("admin model",adminschema)

module.exports = adminmodel