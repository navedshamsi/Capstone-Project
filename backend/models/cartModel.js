const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    // userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
