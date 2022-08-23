const mongoose = require("mongoose");
const OrdersSchema = new mongoose.Schema({
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

const Orders = mongoose.model("Orders", OrdersSchema);


module.exports = Orders;