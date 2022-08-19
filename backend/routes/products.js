const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.post("/add", productsController.addProducts);
router.get("/getAll", productsController.getProducts);
router.get("/getOne", productsController.getOneProduct);
router.put("/update", productsController.updateProducts);
router.delete("/delete", productsController.deleteProduct);

module.exports = router;