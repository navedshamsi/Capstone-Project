const express = require("express")
// const csvRouter =require("./csv-upload");

const userController=require("../controllers/userController")

const router = express.Router()



router.post("/register",userController.register)
router.post("/login",userController.login)
router.post("/logout",userController.logout)
router.post("/get",userController.get)
router.put("/updateUser",userController.update)
router.delete("/deleteUser",userController.deleteUser)

// router.use("/upload-csv", csvRouter);



module.exports  = router