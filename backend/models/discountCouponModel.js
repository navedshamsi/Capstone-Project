const mongoose = require("mongoose");

const DiscountCouponSchema = new mongoose.Schema(
  { 
    
        couponCode: { type: String, required: true },
        discount: { type: Number, default: 10},
        minimumOrderValue: { type: Number, default: 500, },
        category: { type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("DiscountCoupon", DiscountCouponSchema);
