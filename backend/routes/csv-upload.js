const { Router } =require("express");

const verifyToken = require("../middleware/authorize");
const csvController =require("../controllers/csv");

const router = Router();
router.post("/", verifyToken, csvController.bulkUpload);

module.exports =router;
