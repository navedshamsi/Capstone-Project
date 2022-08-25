const DiscountCoupon = require("../models/discountCouponModel");

const welcomeToService = (req,res)=> {
  res.status(200).json("Welcome to discount coupons service");
}

const addNewDiscountCoupon = async (req, res) => {
    const newDiscountCoupon = new DiscountCoupon(req.body);
    try {
      const savedDiscountCoupon = await newDiscountCoupon.save();
      res.status(200).json(savedDiscountCoupon);
    } catch (err) {
      res.status(500).json(err);
    }
  }

const updateDiscountCoupon = async (req, res) => {
    try {
      const updatedDiscountCoupon = await DiscountCoupon.findOneAndUpdate(
        {couponCode:req.body.couponCode},req.body
      );
      res.status(200).json(updatedDiscountCoupon);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
const deleteDiscountCoupon = async (req, res) => {
    const discountCoupon = await DiscountCoupon.findOne(
      {couponCode:req.body.couponCode}
    );
    if(discountCoupon){
      await DiscountCoupon.findOneAndDelete(
        {couponCode:req.body.couponCode})
      res.status(200).json("DiscountCoupon has been deleted...");
    }else{
      res.status(500).json("DiscountCoupon not found");
    }
  }
const getAllDiscountCoupon = async (req, res) => {
 
    try {
      
      
       let discountCoupons = await DiscountCoupon.find();
        if (discountCoupons) {
          res.status(200).json(discountCoupons);
      } else {
        res.status(500).json(err);
      }
      
    } catch (err) {
      res.status(500).json(err);
    }
  }

 

module.exports = { 
  welcomeToService,
  addNewDiscountCoupon,
  updateDiscountCoupon, 
  deleteDiscountCoupon,
  getAllDiscountCoupon
}