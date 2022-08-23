const orderController = require("../controllers/orderController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/add", orderController.addOrder);
router.get("/getAll", orderController.getOrder);
router.get("/getOne", orderController.getOneOrder);
router.put("/update", orderController.updateOrder);
router.post("/delete", orderController.deleteOrder);

module.exports = router;


