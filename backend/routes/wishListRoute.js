const { updateWishList, addToWishList, deleteFromWishList, getUserWishList, getAllUsersWishList } = require("../controllers/wishListController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();


router.post("/add", verifyToken, addToWishList);
router.put("/update", verifyToken, updateWishList);
router.delete("/delete", verifyToken, deleteFromWishList);
router.post("/getall", verifyToken, getUserWishList);


module.exports = router;
