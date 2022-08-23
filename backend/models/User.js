// const mongoose = require("mongoose")
// const schema = mongoose.Schema

// const Userschema = new schema({
//     email:{
//         type:String,
//         required: true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required: true
//     },
//     name:{
//         type:String,
//         required: true
//     },
//     cart:[],
//     wishlist:[]

// })


// const User = mongoose.model("user model",Userschema)

// module.exports = User
const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  //   Phone: { type:Number },
  //   isAdmin: { type: Boolean, default: false, },
  //   img: { type: String },
  //   status: { type: Boolean, default: false, },
  //   address: { type: Object, default: {} },
  //   wishList: { type: Array, default: [], },
  //   orders: { type: Array, default: [], },
  //   cart: { type: Array, default: [], },
  //   discountCoupons: { type: Array, default: [], },
  }
  // { timestamps: true }
);

module.exports = mongoose.model("User", User);