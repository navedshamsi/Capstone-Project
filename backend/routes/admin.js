const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const { updateCart, addToCart, deleteFromCart, getUserCart, getAllUsersCart } = require("../controllers/cartController");
const {verifyToken,verifyTokenAndAuthorization,
   verifyTokenAndAdmin,} = require("../middleware/verifyToken");
const adminController = require("../controllers/adminController");
const productsController=require("../controllers/productsController")

// admin
router.post("/register", adminController.createAdmin);
router.post("/login", adminController.login);
router.post("/logout", adminController.logout);

// products
router.post("/addproducts", verifyToken,productsController.addProducts);
router.get("/getAllproducts",verifyToken, productsController.getProducts);
router.get("/getOneproducts",verifyToken, productsController.getOneProduct);
router.put("/updateproducts",verifyToken, productsController.updateProducts);
router.delete("/deleteproducts",verifyToken, productsController.deleteProduct);

// cart
router.post("/add", verifyToken, addToCart);
router.put("/update", verifyToken, updateCart);
router.delete("/delete", verifyToken, deleteFromCart);
router.post("/getall", verifyToken, getUserCart);

//GET ALL Users 
// router.get("/", verifyTokenAndAdmin, getAllUsersCart);

// router.post("/deleteuser",verifyToken, adminController.deleteUser)
// router.post("/updatepassword", verifyToken,adminController.updatePassword )








module.exports = router;