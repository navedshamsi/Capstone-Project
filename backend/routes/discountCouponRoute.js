const { updateDiscountCoupon,
  addNewDiscountCoupon, 
  deleteDiscountCoupon,
  getAllDiscountCoupon 
} = require("../controllers/discountCouponController");

const {verifyToken} = require("../middleware/verifyToken");

const router = require("express").Router();


router.post("/add",  addNewDiscountCoupon);
router.put("/update",  updateDiscountCoupon);
router.post("/delete",  deleteDiscountCoupon);
router.get("/getall",getAllDiscountCoupon);

module.exports = router;
