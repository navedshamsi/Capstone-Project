const { updateCart, addToCart, deleteFromCart, getUserCart, getAllUsersCart } = require("../controllers/cartController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/add", verifyToken, addToCart);

//UPDATE
router.put("/update", verifyToken, updateCart);

//DELETE
router.delete("/delete", verifyToken, deleteFromCart);

//GET USER CART
router.post("/getall", verifyToken, getUserCart);

//GET ALL Users CART
router.get("/", verifyTokenAndAdmin, getAllUsersCart);

module.exports = router;
