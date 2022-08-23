const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema(
  
    {
      email: { type: String, required: true },
      image: { type: String, required: true },
      category: { type: String },
      name: { type: String },
      description: { type: String },
      price: { type: Number, required: true }
    },
  { timestamps: true }
);

module.exports = mongoose.model("WishList", WishListSchema);
