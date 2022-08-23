const mongoose = require("mongoose");
const ProductsSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price:{
     type:Number,
     required: true,
  },
  description:{
    type:String,
    required: true,
 },
 quantity:{
  type:String,
  required: true,
}
});

const Products = mongoose.model("Products", ProductsSchema);


module.exports = Products;